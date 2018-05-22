// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { ReactInstance, Surface } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    // Add custom options here
    ...options,
  });

  const s = r360.getDefaultSurface();
  s.setShape(Surface.SurfaceShape.Flat);

  r360.renderToSurface(
    r360.createRoot("AppContent", { /* initial props */ }),
    s,
  );

  r360.renderToLocation(
    r360.createRoot('MeditationApp', { /* initial props */ }),
    r360.getDefaultLocation(),
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('images/homebase.png'));
}

window.React360 = {init};
