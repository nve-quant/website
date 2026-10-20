import * as THREE from 'three';

type CutRing = {scale: number; height: number};

/**
 * An original emerald-cut study, not a scan of a graded or certified gemstone.
 * Crisp, separate facet normals matter more here than a high polygon count.
 */
export function createEmerald(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Emerald-cut asset study';

  // The clipped corners, broad table and parallel crown/pavilion steps are the
  // characteristic emerald cut. The extremely thin girdle is a real edge bevel,
  // rather than a wireframe painted over a generic polyhedron.
  const outline: [number, number][] = [
    [-.59, -1.04], [.59, -1.04], [.82, -.81], [.82, .81],
    [.59, 1.04], [-.59, 1.04], [-.82, .81], [-.82, -.81],
  ];
  const cut: CutRing[] = [
    {scale: .61, height: 1.41}, // table
    {scale: .76, height: 1.30},
    {scale: .91, height: 1.15},
    {scale: .995, height: 1.035},
    {scale: 1, height: 1.018}, // polished upper girdle edge
    {scale: 1, height: .987},
    {scale: .992, height: .970},
    {scale: .83, height: .735},
    {scale: .58, height: .440},
    {scale: .29, height: .205},
    {scale: .065, height: .090}, // small culet, not a sharp spike
  ];

  const point = (ring: CutRing, index: number) => {
    const [x, z] = outline[index % outline.length]!;
    return new THREE.Vector3(x * ring.scale, ring.height, z * ring.scale);
  };

  function cutGeometry(rings: CutRing[], closeTop: boolean, closeBottom: boolean) {
    const positions: number[] = [];
    const triangle = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
      for (const vertex of [a, b, c]) {
        positions.push(vertex.x, vertex.y, vertex.z);
      }
    };
    if (closeTop) {
      const centre = new THREE.Vector3(0, rings[0]!.height, 0);
      for (let i = 0; i < outline.length; i++) {
        triangle(centre, point(rings[0]!, i + 1), point(rings[0]!, i));
      }
    }
    for (let tier = 0; tier < rings.length - 1; tier++) {
      for (let i = 0; i < outline.length; i++) {
        const a = point(rings[tier]!, i);
        const b = point(rings[tier]!, i + 1);
        const c = point(rings[tier + 1]!, i + 1);
        const d = point(rings[tier + 1]!, i);
        triangle(a, b, d);
        triangle(b, c, d);
      }
    }
    if (closeBottom) {
      const last = rings.at(-1)!;
      const centre = new THREE.Vector3(0, last.height, 0);
      for (let i = 0; i < outline.length; i++) {
        triangle(centre, point(last, i), point(last, i + 1));
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
  }

  // One transmission surface. The renderer's existing lazy-loading and
  // selected-model visibility mean this extra pass runs only for this study.
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xe0fff2,
    metalness: 0,
    roughness: .028,
    ior: 1.58,
    transmission: .96,
    thickness: .92,
    attenuationColor: 0x28b777,
    attenuationDistance: 1.8,
    envMapIntensity: .9,
    specularIntensity: .85,
    flatShading: true,
  });
  material.name = 'Polished beryl with green volume attenuation';
  const gem = new THREE.Mesh(cutGeometry(cut, true, true), material);
  gem.name = 'Emerald table, crown, girdle and pavilion';
  // A fully opaque shadow would make the stone read as green plastic.
  gem.castShadow = false;
  gem.receiveShadow = false;
  group.add(gem);

  // The inner pavilion supplies the nested reflections visible through a step
  // cut's table. This is a deliberately lightweight optical approximation:
  // inward-facing planes, not an expensive multi-bounce ray-tracing shader.
  const returnRings = cut.slice(6).map(ring => ({
    scale: ring.scale * .974,
    height: ring.height + .012,
  }));
  const returnGeometry = cutGeometry(returnRings, false, true);
  // Different paths through a step-cut stone return different amounts of
  // light. Store this modest variation per facet, keeping one draw call.
  const returnColors: number[] = [];
  const returnTones = [
    0x40be88, 0x1d9966, 0x67d9a2, 0x218d60,
    0x3dbf87, 0x196f4d, 0x54c992, 0x8bdfb2,
  ];
  const tierBrightness = [.86, 1.12, .72, 1.16];
  for (let tier = 0; tier < returnRings.length - 1; tier++) {
    for (let facet = 0; facet < 8; facet++) {
      const color = new THREE.Color(returnTones[(facet + tier * 2) % 8]!);
      color.multiplyScalar(tierBrightness[tier]!);
      for (let vertex = 0; vertex < 6; vertex++) returnColors.push(color.r, color.g, color.b);
    }
  }
  const culetColor = new THREE.Color(0x65c898);
  for (let vertex = 0; vertex < 24; vertex++) returnColors.push(culetColor.r, culetColor.g, culetColor.b);
  returnGeometry.setAttribute('color', new THREE.Float32BufferAttribute(returnColors, 3));
  const returnMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: .12,
    roughness: .12,
    envMapIntensity: 1.05,
    emissive: 0x185f3e,
    emissiveIntensity: .16,
    side: THREE.BackSide,
    flatShading: true,
  });
  returnMaterial.name = 'Internal pavilion reflection approximation';
  const pavilionReturn = new THREE.Mesh(returnGeometry, returnMaterial);
  pavilionReturn.name = 'Internal pavilion returns';
  pavilionReturn.castShadow = false;
  pavilionReturn.receiveShadow = false;
  group.add(pavilionReturn);

  // Sparse, fine internal "jardin" veils prevent the result looking like
  // perfectly homogeneous green acrylic. Batched into a single small mesh,
  // they contain no particles, animation, bitmap downloads or random rebuilds.
  const veinPositions: number[] = [];
  const veinColors: number[] = [];
  let seed = 21947;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 16; i++) {
    const x = (random() - .5) * .73;
    const z = (random() - .5) * 1.06;
    const y = .83 + random() * .22;
    const length = .035 + random() * .10;
    const width = .0008 + random() * .0014;
    const angle = random() * Math.PI;
    const dx = Math.cos(angle) * length;
    const dz = Math.sin(angle) * length;
    veinPositions.push(
      x, y, z, x + dx, y + .009, z + dz, x + dx, y + width, z + dz + width,
    );
    const shade = i % 4 === 0 ? new THREE.Color(0x80bd89) : new THREE.Color(0x114f36);
    for (let j = 0; j < 3; j++) veinColors.push(shade.r, shade.g, shade.b);
  }
  const veinsGeometry = new THREE.BufferGeometry();
  veinsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(veinPositions, 3));
  veinsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(veinColors, 3));
  veinsGeometry.computeVertexNormals();
  const veins = new THREE.Mesh(
    veinsGeometry,
    new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.DoubleSide}),
  );
  veins.name = 'Sparse internal mineral veils';
  group.add(veins);

  // Slightly turn the elongated cut toward the camera, while preserving a
  // level table so the precise polished steps catch the studio softboxes.
  group.rotation.y = .14;
  return group;
}
