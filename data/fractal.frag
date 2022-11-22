// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec2 c = vec2(cx, cy);
  vec2 z = vec2(vertTexCoord.x * 6.28 - 3.14, vertTexCoord.y * 6.28 - 3.14);

  for (int i = 0; i < 20; i++) {
    vec2 sineVector = vec2(sin(z.x) * cosh(z.y), cos(z.x) * sinh(z.y));
    z = vec2((c.x * sineVector.x) - (c.y * sineVector.y), (c.x * sineVector.y) + (c.y * sineVector.x));
  }

  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);

  if (length(z) < pow(50, 2)) {
    diffuse_color = vec4 (1.0, 1.0, 1.0, 1.0);
  }

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);

}