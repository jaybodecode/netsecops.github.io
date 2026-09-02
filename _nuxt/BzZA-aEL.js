import{D as ne,p as _e,r as he}from"./JXFDGQVu.js";function be(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function oe(e){var t=be(e,"string");return typeof t=="symbol"?t:t+""}function ie(e,t,r){return(t=oe(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function te(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),r.push.apply(r,n)}return r}function z(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?te(Object(r),!0).forEach(function(n){ie(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):te(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ye(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function me(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,oe(n.key),n)}}function Te(e,t,r){return t&&me(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(e)}function ae(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(ae=function(){return!!e})()}function ce(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function xe(e,t){if(t&&(typeof t=="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ce(e)}function we(e,t,r){return t=N(t),xe(e,ae()?Reflect.construct(t,r||[],N(e).constructor):t.apply(e,r))}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},V(e,t)}function Ae(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}function G(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function Ee(e){if(Array.isArray(e))return G(e)}function Se(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Re(e,t){if(e){if(typeof e=="string")return G(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?G(e,t):void 0}}function Oe(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function B(e){return Ee(e)||Se(e)||Re(e)||Oe()}function ue(e,t,r,n){var l=Math.pow(1-e,2)*t.x+2*(1-e)*e*r.x+Math.pow(e,2)*n.x,i=Math.pow(1-e,2)*t.y+2*(1-e)*e*r.y+Math.pow(e,2)*n.y;return{x:l,y:i}}function ke(e,t,r){for(var n=20,l=0,i=e,h=0;h<n;h++){var u=ue((h+1)/n,e,t,r);l+=Math.sqrt(Math.pow(i.x-u.x,2)+Math.pow(i.y-u.y,2)),i=u}return l}function Pe(e){var t=e.curvatureAttribute,r=e.defaultCurvature,n=e.keepLabelUpright,l=n===void 0?!0:n;return function(i,h,u,p,x){var b=x.edgeLabelSize,s=h[t]||r,v=x.edgeLabelFont,c=x.edgeLabelWeight,a=x.edgeLabelColor.attribute?h[x.edgeLabelColor.attribute]||x.edgeLabelColor.color||"#000":x.edgeLabelColor.color,o=h.label;if(o){i.fillStyle=a,i.font="".concat(c," ").concat(b,"px ").concat(v);var y=!l||u.x<p.x,f=y?u.x:p.x,_=y?u.y:p.y,w=y?p.x:u.x,d=y?p.y:u.y,R=(f+w)/2,m=(_+d)/2,T=w-f,A=d-_,g=Math.sqrt(Math.pow(T,2)+Math.pow(A,2)),C=y?1:-1,E=R+A*s*C,S=m-T*s*C,k=h.size*.7+5,I={x:S-_,y:-(E-f)},Y=Math.sqrt(Math.pow(I.x,2)+Math.pow(I.y,2)),M={x:d-S,y:-(w-E)},W=Math.sqrt(Math.pow(M.x,2)+Math.pow(M.y,2));f+=k*I.x/Y,_+=k*I.y/Y,w+=k*M.x/W,d+=k*M.y/W,E+=k*A/g,S-=k*T/g;var q={x:E,y:S},K={x:f,y:_},Q={x:w,y:d},j=ke(K,q,Q);if(!(j<u.size+p.size)){var L=i.measureText(o).width,$=j-u.size-p.size;if(L>$){var J="…";for(o=o+J,L=i.measureText(o).width;L>$&&o.length>1;)o=o.slice(0,-2)+J,L=i.measureText(o).width;if(o.length<4)return}for(var H={},U=0,le=o.length;U<le;U++){var F=o[U];H[F]||(H[F]=i.measureText(F).width*(1+s*.35))}for(var P=.5-L/j/2,D=0,fe=o.length;D<fe;D++){var Z=o[D],ee=ue(P,K,q,Q),de=2*(1-P)*(E-f)+2*P*(w-E),ge=2*(1-P)*(S-_)+2*P*(d-S),pe=Math.atan2(ge,de);i.save(),i.translate(ee.x,ee.y),i.rotate(pe),i.fillText(Z,0,0),i.restore(),P+=H[Z]/j}}}}}function ze(e){var t=e.arrowHead,r=t?.extremity==="target"||t?.extremity==="both",n=t?.extremity==="source"||t?.extremity==="both",l=`
precision highp float;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`.concat(r?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(n?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(t?`
uniform float u_lengthToThicknessRatio;
uniform float u_widenessToThicknessRatio;`:"",`

float det(vec2 a, vec2 b) {
  return a.x * b.y - b.x * a.y;
}

vec2 getDistanceVector(vec2 b0, vec2 b1, vec2 b2) {
  float a = det(b0, b2), b = 2.0 * det(b1, b0), d = 2.0 * det(b2, b1);
  float f = b * d - a * a;
  vec2 d21 = b2 - b1, d10 = b1 - b0, d20 = b2 - b0;
  vec2 gf = 2.0 * (b * d21 + d * d10 + a * d20);
  gf = vec2(gf.y, -gf.x);
  vec2 pp = -f * gf / dot(gf, gf);
  vec2 d0p = b0 - pp;
  float ap = det(d0p, d20), bp = 2.0 * det(d10, d0p);
  float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
  return mix(mix(b0, b1, t), mix(b1, b2, t), t);
}

float distToQuadraticBezierCurve(vec2 p, vec2 b0, vec2 b1, vec2 b2) {
  return length(getDistanceVector(b0 - p, b1 - p, b2 - p));
}

const vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);

void main(void) {
  float dist = distToQuadraticBezierCurve(gl_FragCoord.xy, v_cpA, v_cpB, v_cpC);
  float thickness = v_thickness;
`).concat(r?`
  float distToTarget = length(gl_FragCoord.xy - v_targetPoint);
  float targetArrowLength = v_targetSize + thickness * u_lengthToThicknessRatio;
  if (distToTarget < targetArrowLength) {
    thickness = (distToTarget - v_targetSize) / (targetArrowLength - v_targetSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`
`).concat(n?`
  float distToSource = length(gl_FragCoord.xy - v_sourcePoint);
  float sourceArrowLength = v_sourceSize + thickness * u_lengthToThicknessRatio;
  if (distToSource < sourceArrowLength) {
    thickness = (distToSource - v_sourceSize) / (sourceArrowLength - v_sourceSize) * u_widenessToThicknessRatio * thickness;
  }`:"",`

  float halfThickness = thickness / 2.0;
  if (dist < halfThickness) {
    #ifdef PICKING_MODE
    gl_FragColor = v_color;
    #else
    float t = smoothstep(
      halfThickness - v_feather,
      halfThickness,
      dist
    );

    gl_FragColor = mix(v_color, transparent, t);
    #endif
  } else {
    gl_FragColor = transparent;
  }
}
`);return l}function Ce(e){var t=e.arrowHead,r=t?.extremity==="target"||t?.extremity==="both",n=t?.extremity==="source"||t?.extremity==="both",l=`
attribute vec4 a_id;
attribute vec4 a_color;
attribute float a_direction;
attribute float a_thickness;
attribute vec2 a_source;
attribute vec2 a_target;
attribute float a_current;
attribute float a_curvature;
`.concat(r?`attribute float a_targetSize;
`:"",`
`).concat(n?`attribute float a_sourceSize;
`:"",`

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_pixelRatio;
uniform vec2 u_dimensions;
uniform float u_minEdgeThickness;
uniform float u_feather;

varying vec4 v_color;
varying float v_thickness;
varying float v_feather;
varying vec2 v_cpA;
varying vec2 v_cpB;
varying vec2 v_cpC;
`).concat(r?`
varying float v_targetSize;
varying vec2 v_targetPoint;`:"",`
`).concat(n?`
varying float v_sourceSize;
varying vec2 v_sourcePoint;`:"",`
`).concat(t?`
uniform float u_widenessToThicknessRatio;`:"",`

const float bias = 255.0 / 254.0;
const float epsilon = 0.7;

vec2 clipspaceToViewport(vec2 pos, vec2 dimensions) {
  return vec2(
    (pos.x + 1.0) * dimensions.x / 2.0,
    (pos.y + 1.0) * dimensions.y / 2.0
  );
}

vec2 viewportToClipspace(vec2 pos, vec2 dimensions) {
  return vec2(
    pos.x / dimensions.x * 2.0 - 1.0,
    pos.y / dimensions.y * 2.0 - 1.0
  );
}

void main() {
  float minThickness = u_minEdgeThickness;

  // Selecting the correct position
  // Branchless "position = a_source if a_current == 1.0 else a_target"
  vec2 position = a_source * max(0.0, a_current) + a_target * max(0.0, 1.0 - a_current);
  position = (u_matrix * vec3(position, 1)).xy;

  vec2 source = (u_matrix * vec3(a_source, 1)).xy;
  vec2 target = (u_matrix * vec3(a_target, 1)).xy;

  vec2 viewportPosition = clipspaceToViewport(position, u_dimensions);
  vec2 viewportSource = clipspaceToViewport(source, u_dimensions);
  vec2 viewportTarget = clipspaceToViewport(target, u_dimensions);

  vec2 delta = viewportTarget.xy - viewportSource.xy;
  float len = length(delta);
  vec2 normal = vec2(-delta.y, delta.x) * a_direction;
  vec2 unitNormal = normal / len;
  float boundingBoxThickness = len * a_curvature;

  float curveThickness = max(minThickness, a_thickness / u_sizeRatio);
  v_thickness = curveThickness * u_pixelRatio;
  v_feather = u_feather;

  v_cpA = viewportSource;
  v_cpB = 0.5 * (viewportSource + viewportTarget) + unitNormal * a_direction * boundingBoxThickness;
  v_cpC = viewportTarget;

  vec2 viewportOffsetPosition = (
    viewportPosition +
    unitNormal * (boundingBoxThickness / 2.0 + sign(boundingBoxThickness) * (`).concat(t?"curveThickness * u_widenessToThicknessRatio":"curveThickness",` + epsilon)) *
    max(0.0, a_direction) // NOTE: cutting the bounding box in half to avoid overdraw
  );

  position = viewportToClipspace(viewportOffsetPosition, u_dimensions);
  gl_Position = vec4(position, 0, 1);
    
`).concat(r?`
  v_targetSize = a_targetSize * u_pixelRatio / u_sizeRatio;
  v_targetPoint = viewportTarget;
`:"",`
`).concat(n?`
  v_sourceSize = a_sourceSize * u_pixelRatio / u_sizeRatio;
  v_sourcePoint = viewportSource;
`:"",`

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`);return l}var se=.25,Le={arrowHead:null,curvatureAttribute:"curvature",defaultCurvature:se},Ie={edgeIndexAttribute:"parallelIndex",edgeMinIndexAttribute:"parallelMinIndex",edgeMaxIndexAttribute:"parallelMaxIndex"};function je(e,t){var r=z(z({},Ie),t||{}),n={},l={},i={},h=0;e.forEachNode(function(m){n[m]=++h+""}),e.forEachEdge(function(m,T,A,g){var C=n[A],E=n[g],S=[C,E].join("-");l[m]=S,i[S]=[C,E].sort().join("-")});var u={},p={};e.forEachEdge(function(m){var T=l[m],A=i[T];u[T]=u[T]||[],u[T].push(m),p[A]=p[A]||[],p[A].push(m)});for(var x in u){var b=u[x],s=b.length,v=p[i[x]].length;if(s===1&&v===1){var c=b[0];e.setEdgeAttribute(c,r.edgeIndexAttribute,null),e.setEdgeAttribute(c,r.edgeMaxIndexAttribute,null)}else if(s===1){var a=b[0];e.setEdgeAttribute(a,r.edgeIndexAttribute,1),e.setEdgeAttribute(a,r.edgeMaxIndexAttribute,1)}else if(s===v)for(var o=(s-1)/2,y=-o,f=0;f<s;f++){var _=b[f],w=-(s-1)/2+f;e.setEdgeAttribute(_,r.edgeIndexAttribute,w),e.setEdgeAttribute(_,r.edgeMinIndexAttribute,y),e.setEdgeAttribute(_,r.edgeMaxIndexAttribute,o)}else for(var d=0;d<s;d++){var R=b[d];e.setEdgeAttribute(R,r.edgeIndexAttribute,d+1),e.setEdgeAttribute(R,r.edgeMaxIndexAttribute,s)}}}var ve=WebGLRenderingContext,re=ve.UNSIGNED_BYTE,O=ve.FLOAT;function X(e){var t=z(z({},Le),e||{}),r=t,n=r.arrowHead,l=r.curvatureAttribute,i=r.drawLabel,h=n?.extremity==="target"||n?.extremity==="both",u=n?.extremity==="source"||n?.extremity==="both",p=["u_matrix","u_sizeRatio","u_dimensions","u_pixelRatio","u_feather","u_minEdgeThickness"].concat(B(n?["u_lengthToThicknessRatio","u_widenessToThicknessRatio"]:[]));return(function(x){Ae(b,x);function b(){var s;ye(this,b);for(var v=arguments.length,c=new Array(v),a=0;a<v;a++)c[a]=arguments[a];return s=we(this,b,[].concat(c)),ie(ce(s),"drawLabel",i||Pe(t)),s}return Te(b,[{key:"getDefinition",value:function(){return{VERTICES:6,VERTEX_SHADER_SOURCE:Ce(t),FRAGMENT_SHADER_SOURCE:ze(t),METHOD:WebGLRenderingContext.TRIANGLES,UNIFORMS:p,ATTRIBUTES:[{name:"a_source",size:2,type:O},{name:"a_target",size:2,type:O}].concat(B(h?[{name:"a_targetSize",size:1,type:O}]:[]),B(u?[{name:"a_sourceSize",size:1,type:O}]:[]),[{name:"a_thickness",size:1,type:O},{name:"a_curvature",size:1,type:O},{name:"a_color",size:4,type:re,normalized:!0},{name:"a_id",size:4,type:re,normalized:!0}]),CONSTANT_ATTRIBUTES:[{name:"a_current",size:1,type:O},{name:"a_direction",size:1,type:O}],CONSTANT_DATA:[[0,1],[0,-1],[1,1],[0,-1],[1,1],[1,-1]]}}},{key:"processVisibleItem",value:function(v,c,a,o,y){var f,_=y.size||1,w=a.x,d=a.y,R=o.x,m=o.y,T=_e(y.color),A=(f=y[l])!==null&&f!==void 0?f:se,g=this.array;g[c++]=w,g[c++]=d,g[c++]=R,g[c++]=m,h&&(g[c++]=o.size),u&&(g[c++]=a.size),g[c++]=_,g[c++]=A,g[c++]=T,g[c++]=v}},{key:"setUniforms",value:function(v,c){var a=c.gl,o=c.uniformLocations,y=o.u_matrix,f=o.u_pixelRatio,_=o.u_feather,w=o.u_sizeRatio,d=o.u_dimensions,R=o.u_minEdgeThickness;if(a.uniformMatrix3fv(y,!1,v.matrix),a.uniform1f(f,v.pixelRatio),a.uniform1f(w,v.sizeRatio),a.uniform1f(_,v.antiAliasingFeather),a.uniform2f(d,v.width*v.pixelRatio,v.height*v.pixelRatio),a.uniform1f(R,v.minEdgeThickness),n){var m=o.u_lengthToThicknessRatio,T=o.u_widenessToThicknessRatio;a.uniform1f(m,n.lengthToThicknessRatio),a.uniform1f(T,n.widenessToThicknessRatio)}}}]),b})(he)}var Ne=X(),He=X({arrowHead:ne}),Ue=X({arrowHead:z(z({},ne),{},{extremity:"both"})});export{se as DEFAULT_EDGE_CURVATURE,Le as DEFAULT_EDGE_CURVE_PROGRAM_OPTIONS,Ie as DEFAULT_INDEX_PARALLEL_EDGES_OPTIONS,He as EdgeCurvedArrowProgram,Ue as EdgeCurvedDoubleArrowProgram,Pe as createDrawCurvedEdgeLabel,X as createEdgeCurveProgram,Ne as default,je as indexParallelEdgesIndex};
