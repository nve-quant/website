import * as THREE from 'three';

/**
 * Original portfolio-share study. The engraved face is a drawing, not a
 * financial document, credential or representation of an issued security.
 */
export function createFund(): THREE.Group {
  const group = new THREE.Group();
  const width = 1.68;
  const depth = 1.96;
  const radius = .13;

  function roundedRect(w: number, d: number, r: number) {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -d / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + d - r);
    shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
    shape.lineTo(x + r, y + d);
    shape.quadraticCurveTo(x, y + d, x, y + d - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function plate(w: number, d: number, h: number, r: number, bevel: number) {
    const geometry = new THREE.ExtrudeGeometry(roundedRect(w, d, r), {
      depth: h,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelSize: bevel,
      bevelThickness: bevel,
      bevelSegments: 3,
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.center();
    return geometry;
  }

  const metal = new THREE.MeshStandardMaterial({
    color: 0xd1cab0,
    metalness: 1,
    roughness: .22,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: 0x50665c,
    metalness: .88,
    roughness: .3,
  });
  const enamel = new THREE.MeshPhysicalMaterial({
    color: 0x153f32,
    metalness: .36,
    roughness: .27,
    clearcoat: .65,
    clearcoatRoughness: .2,
  });
  const baseGeometry = plate(width, depth, .092, radius, .016);
  const seamGeometry = plate(width + .002, depth + .002, .014, radius, .004);
  const enamelGeometry = plate(width - .065, depth - .065, .027, radius - .022, .012);

  const faceCanvas = document.createElement('canvas');
  faceCanvas.width = 1024;
  faceCanvas.height = 1024;
  const face = faceCanvas.getContext('2d')!;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 512;
  const bump = bumpCanvas.getContext('2d')!;
  bump.scale(.5, .5);
  const size = 1024;

  // A satin enamel field and lightly recessed engraving catch studio lighting.
  face.fillStyle = '#174737';
  face.fillRect(0, 0, size, size);
  bump.fillStyle = '#a0a0a0';
  bump.fillRect(0, 0, size, size);
  let seed = 8941;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 800; i++) {
    const x = random() * size;
    const y = random() * size;
    const length = 8 + random() * 90;
    face.strokeStyle = i % 2 ? 'rgba(228,234,207,.025)' : 'rgba(0,18,11,.035)';
    face.lineWidth = .7;
    face.beginPath();
    face.moveTo(x, y);
    face.lineTo(x + length, y + .2);
    face.stroke();
  }

  function border(context: CanvasRenderingContext2D, inset: number, line: number) {
    context.lineWidth = line;
    context.beginPath();
    context.roundRect(inset, inset, size - inset * 2, size - inset * 2, 47);
    context.stroke();
  }
  function drawEngraving(context: CanvasRenderingContext2D, isBump: boolean) {
    context.strokeStyle = isBump ? '#737373' : '#b4b995';
    context.fillStyle = isBump ? '#737373' : '#d4d6bc';
    border(context, 36, 2);
    border(context, 48, .9);
    border(context, 77, .8);

    // Interlaced waves are an original security-print-inspired illustration.
    // They deliberately omit certification marks, serials and issuer logos.
    context.save();
    context.beginPath();
    context.roundRect(90, 90, 844, 844, 25);
    context.clip();
    context.globalAlpha = isBump ? .6 : .48;
    context.lineWidth = .7;
    for (let wave = 0; wave < 18; wave++) {
      context.beginPath();
      for (let step = 0; step <= 360; step++) {
        const t = step / 360 * Math.PI * 2;
        const ripple = Math.cos(t * 14 + wave * .26) * (19 + wave * .6);
        const x = 512 + Math.cos(t) * (310 + wave * 3.3 + ripple);
        const y = 512 + Math.sin(t) * (348 + wave * 3 + ripple);
        if (step === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }
    context.restore();

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '40px Georgia, serif';
    context.fillText('Treasury portfolio', 512, 402);
    context.font = '86px Georgia, serif';
    context.fillText('Fund share', 512, 479);

    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(385, 556);
    context.lineTo(639, 556);
    context.stroke();
    context.font = '19px sans-serif';
    context.fillText('An interest in the underlying portfolio', 512, 607);
    context.font = '17px sans-serif';
    context.fillText('Illustrative asset study', 512, 850);

    // A geometric portfolio motif: several interests share the same boundary.
    context.lineWidth = 1;
    for (const offset of [-18, 0, 18]) {
      context.beginPath();
      context.moveTo(512 + offset, 198);
      context.lineTo(544 + offset, 230);
      context.lineTo(512 + offset, 262);
      context.lineTo(480 + offset, 230);
      context.closePath();
      context.stroke();
    }
  }
  drawEngraving(face, false);
  drawEngraving(bump, true);

  const faceTexture = new THREE.CanvasTexture(faceCanvas);
  faceTexture.colorSpace = THREE.SRGBColorSpace;
  faceTexture.anisotropy = 4;
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.anisotropy = 4;
  const faceMaterial = new THREE.MeshPhysicalMaterial({
    map: faceTexture,
    bumpMap: bumpTexture,
    bumpScale: .002,
    metalness: .45,
    roughness: .31,
    clearcoat: .45,
    clearcoatRoughness: .24,
  });

  // ShapeGeometry UVs are normalized explicitly to avoid a clipped decal.
  const faceGeometry = new THREE.ShapeGeometry(
    roundedRect(width - .12, depth - .12, radius - .037),
    12,
  );
  const positions = faceGeometry.getAttribute('position');
  const uv = faceGeometry.getAttribute('uv');
  for (let i = 0; i < positions.count; i++) {
    uv.setXY(
      i,
      positions.getX(i) / (width - .12) + .5,
      positions.getY(i) / (depth - .12) + .5,
    );
  }
  faceGeometry.rotateX(-Math.PI / 2);
  uv.needsUpdate = true;

  const addMesh = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    parent: THREE.Object3D,
    y = 0,
  ) => {
    const object = new THREE.Mesh(geometry, material);
    object.position.y = y;
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };

  const layers = [
    {y: .09, x: -.065, z: -.025, turn: -.12},
    {y: .29, x: .025, z: .012, turn: -.055},
    {y: .49, x: -.02, z: -.015, turn: .022},
    {y: .75, x: .025, z: .035, turn: .105},
  ];
  layers.forEach((layer, index) => {
    const certificate = new THREE.Group();
    certificate.position.set(layer.x, layer.y, layer.z);
    certificate.rotation.y = layer.turn;
    group.add(certificate);
    addMesh(baseGeometry, metal, certificate);
    addMesh(seamGeometry, edge, certificate, -.019).castShadow = false;
    addMesh(enamelGeometry, enamel, certificate, .064).castShadow = false;
    const faceMesh = addMesh(faceGeometry, faceMaterial, certificate, .091);
    faceMesh.castShadow = false;

    // Small notches interrupt the specular edge, making the thickness legible.
    if (index < layers.length - 1) {
      const notch = addMesh(
        new THREE.BoxGeometry(.23, .022, .008),
        edge,
        certificate,
      );
      notch.position.set(.43, .005, depth / 2 + .015);
      notch.castShadow = false;
    }
  });
  return group;
}
