// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D my_mask;
uniform float blur_flag;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  // grab the color values from the texture and the mask
  vec4 diffuse_color = texture2D(my_texture, vertTexCoord.xy);
  vec4 mask_color = texture2D(my_mask, vertTexCoord.xy);

  // half sheep, half mask
  if (vertTexCoord.x > 0.5)
    diffuse_color = mask_color;

  // simple diffuse shading model
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);

  if (blur_flag == 1) {
    float blur_radius;
    if (mask_color.r < 0.32) {
      blur_radius = 3;
    } else if (0.32 < mask_color.r && mask_color.r < 0.5) {
      blur_radius = 3;
    } else if (mask_color.r > 0.5) {
      blur_radius = 2.45;
    }

    vec4 blur_color = vec4(0, 0, 0, 0);
    vec2 texture_size = textureSize(my_texture, 0);
    float texel_size = 1 / texture_size.x;
    vec2 p = vec2(0, 0);

    for (float i = -blur_radius; i < blur_radius; i++) {
      for (float j = -blur_radius; j < blur_radius; j++) {
        p.x = vertTexCoord.x + i * texel_size;
        p.y = vertTexCoord.y + j * texel_size;
        blur_color += texture2D(my_texture, p);
      }
      blur_color /= (blur_radius * blur_radius);
    }

    diffuse_color = blur_color;
  }
  
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
}
