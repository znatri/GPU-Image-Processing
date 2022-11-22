// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  gl_FragColor = vec4(0.22, 0.74, 0.72, 1);

  float rot_angle = 0.78; // radians(PI / 4)
  mat2 rotate = mat2(cos(rot_angle), -sin(rot_angle),
                     sin(rot_angle), cos(rot_angle));
  
  vec2 tempCoord = vec2(vertTexCoord.x - 0.5, vertTexCoord.y - 0.5);
  tempCoord = rotate * tempCoord;
  tempCoord.x += 0.5;
  tempCoord.y += 0.5;

  for (int j = 1; j < 10; j += 2) {

    float numCol;

    if (j == 1 || j == 9) {
      numCol = 0;
    } else if (j == 3 || j == 7) {
      numCol = 0.2;
    } else if (j == 5) {
      numCol = 0.4;
    }

    for (float i = -numCol; i <= numCol; i += 0.2) {

      vec2 squareCentreCoord = vec2(0.5 + i, 0.1 * j);
      float x = tempCoord.x - (squareCentreCoord.x);
      float y = tempCoord.y - (squareCentreCoord.y);

      if (0.075 >= x && x >= (-0.075)) {
        if (0.075 >= y && y >= -0.075){
          gl_FragColor = vec4(0.22, 0.74, 0.72, 0);
        }
      }

    }
  }

}

