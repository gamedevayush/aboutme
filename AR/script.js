window.onload = function () {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // No more null error here

    var ArToolkitSource = new THREEx.ArToolkitSource({
        sourceType: "webcam",
    });

    ArToolkitSource.init(function () {
        setTimeout(function () {
            ArToolkitSource.resize();
            ArToolkitSource.copySizeTo(renderer.domElement);
        }, 2000);
    });

    var ArToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/aframe/examples/camera_para.dat',
        detectionMode: 'color_matrix'
    });

    ArToolkitContext.init(function () {
        camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
    });

    var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
        type: 'pattern',
        patternUrl: 'pattern-hiro.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = geometry.parameters.height / 2;
    scene.add(cube);

    camera.position.z = 5;

    var markerFound = false;

    function animate() {
        requestAnimationFrame(animate);

        if (ArToolkitSource.ready) {
            ArToolkitContext.update(ArToolkitSource.domElement);
            markerFound = camera.visible;
        }

        scene.visible = markerFound;
        renderer.render(scene, camera);
    };

    animate();
};
