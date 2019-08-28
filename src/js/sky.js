/* eslint-disable */

export default function (element, params) {
  const settings = {};
  settings.width = 480;
  settings.height = 480;
  settings.autoResize = false;
  settings.autoResizeMinWidth = null;
  settings.autoResizeMaxWidth = null;
  settings.autoResizeMinHeight = null;
  settings.autoResizeMaxHeight = null;
  settings.addMouseControls = false;
  settings.addTouchControls = false;
  settings.hideContextMenu = true;
  settings.starCount = 22222;
  settings.starBgCount = 2222;
  settings.starBgColor = { r: 255, g: 255, b: 255 };
  settings.starBgColorRangeMin = 10;
  settings.starBgColorRangeMax = 40;
  settings.starColor = { r: 255, g: 255, b: 255 };
  settings.starColorRangeMin = 10;
  settings.starColorRangeMax = 100;
  settings.starfieldBackgroundColor = { r: 0, g: 0, b: 0 };
  settings.starDirection = 1;
  settings.starSpeed = 40;
  settings.starSpeedMax = 200;
  settings.starSpeedAnimationDuration = 2;
  settings.starFov = 300;
  settings.starFovMin = 200;
  settings.starFovAnimationDuration = 2;
  settings.starRotationPermission = true;
  settings.starRotationDirection = 1;
  settings.starRotationSpeed = 0.0;
  settings.starRotationSpeedMax = 1.0;
  settings.starRotationAnimationDuration = 2;
  settings.starWarpLineLength = 2.0;
  settings.starWarpTunnelDiameter = 100;
  settings.starFollowMouseSensitivity = 0.025;
  settings.starFollowMouseXAxis = true;
  settings.starFollowMouseYAxis = true;

  //---

  if ( params !== undefined ) {
    for ( const prop in params ) {
      if ( params.hasOwnProperty( prop ) && settings.hasOwnProperty( prop ) ) {
        settings[ prop ] = params[ prop ];
      }
    }
  }

  //---

  for ( const prop in settings ) {

    if ( settings.hasOwnProperty( prop ) && prop.indexOf( 'Duration' ) > -1 ) {

      settings[ prop ] = settings[ prop ] * 60;

    }

  }

  if ( typeof settings.starBgColor === 'string' && settings.starBgColor.indexOf( '#' ) > -1 ) {

    settings.starBgColor = hexToRgb( settings.starBgColor );

  } else if ( typeof settings.starBgColor === 'string' && settings.starBgColor.indexOf( 'rgb' ) > -1 ) {

    settings.starBgColor = parseRGBString( settings.starBgColor );

  }

  if ( typeof settings.starColor === 'string' && settings.starColor.indexOf( '#' ) > -1 ) {

    settings.starColor = hexToRgb( settings.starColor );

  } else if ( typeof settings.starColor === 'string' && settings.starColor.indexOf( 'rgb' ) > -1 ) {

    settings.starColor = parseRGBString( settings.starColor );

  }

  if ( typeof settings.starfieldBackgroundColor === 'string' && settings.starfieldBackgroundColor.indexOf( '#' ) > -1 ) {

    settings.starfieldBackgroundColor = hexToRgb( settings.starfieldBackgroundColor );

  } else if ( typeof settings.starfieldBackgroundColor === 'string' && settings.starfieldBackgroundColor.indexOf( 'rgb' ) > -1 ) {

    settings.starfieldBackgroundColor = parseRGBString( settings.starfieldBackgroundColor );

  }

  if ( !element ) {

    throw Error( '\n' + 'No div element found' );

  }

  //---

  let MATHPI180 = Math.PI / 180;
  let MATHPI2 = Math.PI * 2;

  let canvasWidth = settings.width;
  let canvasHeight = settings.height;

  let starCount = settings.starCount;
  let starBgCount = settings.starBgCount;

  let starBgColor = settings.starBgColor;
  let starBgColorRangeMin = settings.starBgColorRangeMin
  let starBgColorRangeMax = settings.starBgColorRangeMax
  let starColor = settings.starColor;
  let starColorRangeMin = settings.starColorRangeMin;
  let starColorRangeMax = settings.starColorRangeMax;

  let starfieldBackgroundColor = settings.starfieldBackgroundColor;

  let starDirection = settings.starDirection;

  let starSpeed = settings.starSpeed;
  let starSpeedMin = starSpeed;
  let starSpeedMax = settings.starSpeedMax;
  let starSpeedAnimationDuration = settings.starFovAnimationDuration;
  let starSpeedAnimationTime = 0;

  let starFov = settings.starFov;
  let starFovMin = settings.starFovMin;
  let starFovMax = starFov;
  let starFovAnimationDuration = settings.starFovAnimationDuration;
  let starFovAnimationTime = starFovAnimationDuration;

  let starRotation = 0.0;
  let starRotationPermission = settings.starRotationPermission;
  let starRotationDirection = settings.starRotationDirection;
  let starRotationSpeed = settings.starRotationSpeed;
  let starRotationSpeedMin = starRotationSpeed;
  let starRotationSpeedMax = settings.starRotationSpeedMax;
  let starRotationAnimationDuration = settings.starRotationAnimationDuration;
  let starRotationAnimationTime = 0;

  let starWarpLineLength = settings.starWarpLineLength;
  let starWarpTunnelDiameter = settings.starWarpTunnelDiameter;
  let starFollowMouseSensitivity = settings.starFollowMouseSensitivity;
  let starFollowMouseXAxis = settings.starFollowMouseXAxis;
  let starFollowMouseYAxis = settings.starFollowMouseYAxis;
  let starDistance = 8000;

  let starBorderFront = -starFovMin + 1;
  let starBorderBack = starDistance;

  let starHolder;
  let starBgHolder;
  let starColorLookupTable;
  let starBgColorLookupTable;

  let canvas, ctx, imageData, pix;

  let center;

  let mouseActive;
  let mouseDown;
  let mousePos;

  let paused = false;

  //---

  function init() {

    canvas = document.createElement( 'canvas' );
    canvas.style.backgroundColor = rgbToHex( starfieldBackgroundColor.r, starfieldBackgroundColor.g, starfieldBackgroundColor.b );
    canvas.setAttribute( 'width', canvasWidth );
    canvas.setAttribute( 'height', canvasHeight );

    if ( settings.addMouseControls ) {

      canvas.addEventListener( 'mousemove', mouseMoveHandler, false );
      canvas.addEventListener( 'mousedown', mouseDownHandler, false );
      canvas.addEventListener( 'mouseup', mouseUpHandler, false );
      canvas.addEventListener( 'mouseenter', mouseEnterHandler, false );
      canvas.addEventListener( 'mouseleave', mouseLeaveHandler, false );

    }

    if ( settings.addTouchControls ) {

      canvas.addEventListener( 'touchstart', touchStartHandler, false );
      canvas.addEventListener( 'touchend', touchEndHandler, false );
      canvas.addEventListener( 'touchmove', touchMoveHandler, false );
      canvas.addEventListener( 'touchcancel', touchCancelHandler, false );

    }

    if ( settings.hideContextMenu ) {

      canvas.oncontextmenu = function( e ) {

        e.preventDefault();

      };

    }

    element.appendChild( canvas );

    //---

    ctx = canvas.getContext( '2d' );
    imageData = ctx.getImageData( 0, 0, canvasWidth, canvasHeight );
    pix = imageData.data;

    //---

    center = { x: canvas.width / 2, y: canvas.height / 2 };

    mouseActive = false;
    mouseDown = false;
    mousePos = { x: center.x, y: center.y };

    //---

    starColorLookupTable = [];
    starBgColorLookupTable = [];
    starHolder = [];
    starBgHolder = [];

    addColorLookupTable( starColorLookupTable, starColorRangeMin, starColorRangeMax, starfieldBackgroundColor, starColor );
    addColorLookupTable( starBgColorLookupTable, starBgColorRangeMin, starBgColorRangeMax, starfieldBackgroundColor, starBgColor );
    addStars();
    animloop();

    //---

    if ( settings.autoResize ) {

      window.addEventListener( 'resize', resizeHandler );

      resize();

    }

  }

  //---

  Math.easeInQuad = function( t, b, c, d ) {

    return c * t * t / ( d * d ) + b;

  };

  Math.easeOutQuad = function( t, b, c, d ) {

    return -c * t * t / ( d * d ) + 2 * c * t / d + b;

  };

  //---
  //http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

  function shadeBlend( p, c0, c1 ) {

    let n = p < 0 ? p * -1 : p,
      u = Math.round,
      w = parseInt;
    let f = w( c0.slice( 1 ), 16 ),
      t = w( ( c1 ? c1 : p < 0 ? '#000000' : '#FFFFFF' ).slice( 1 ), 16 ),
      R1 = f >> 16,
      G1 = f >> 8 & 0x00FF,
      B1 = f & 0x0000FF;

    return '#' + ( 0x1000000 + ( u( ( ( t >> 16 ) - R1 ) * n ) + R1 ) * 0x10000 + ( u( ( ( t >> 8 & 0x00FF ) - G1 ) * n ) + G1 ) * 0x100 + ( u( ( ( t & 0x0000FF ) - B1 ) * n ) + B1 ) ).toString( 16 ).slice( 1 );

  }

  //---
  //http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

  function hexToRgb( hex ) {

    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace( shorthandRegex, function( m, r, g, b ) {

      return r + r + g + g + b + b;

    } );

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );

    return result ? {

      r: parseInt( result[ 1 ], 16 ),
      g: parseInt( result[ 2 ], 16 ),
      b: parseInt( result[ 3 ], 16 )

    } : null;

  }

  function rgbToHex( r, g, b ) {

    let rgb = b | ( g << 8 ) | ( r << 16 );

    return '#' + ( 0x1000000 + rgb ).toString( 16 ).slice( 1 );

  }

  //---

  function parseRGBString( rgbString ) {

    rgbString = rgbString.replace( /\s+/g, '' );

    let rgbValues = rgbString.split( '(' )[ 1 ].split( ')' )[ 0 ].split( ',' );

    return { r: rgbValues[ 0 ], g: rgbValues[ 1 ], b: rgbValues[ 2 ] };

  }

  //---

  function clearImageData() {

    for ( let i = 0, l = pix.length; i < l; i += 4 ) {

      pix[ i ] = starfieldBackgroundColor.r;
      pix[ i + 1 ] = starfieldBackgroundColor.g;
      pix[ i + 2 ] = starfieldBackgroundColor.b;
      pix[ i + 3 ] = 0;

    }

  }

  function setPixelAdditive( x, y, r, g, b, a ) {

    let i = ( x + y * canvasWidth ) * 4;

    pix[ i ] = pix[ i ] + r;
    pix[ i + 1 ] = pix[ i + 1 ] + g;
    pix[ i + 2 ] = pix[ i + 2 ] + b;
    pix[ i + 3 ] = a;

  }

  //---

  function drawLine( x1, y1, x2, y2, r, g, b, a ) {

    let dx = Math.abs( x2 - x1 );
    let dy = Math.abs( y2 - y1 );

    let sx = ( x1 < x2 ) ? 1 : -1;
    let sy = ( y1 < y2 ) ? 1 : -1;

    let err = dx - dy;

    let lx = x1;
    let ly = y1;

    while ( true ) {

      if ( lx > -1 && lx < canvasWidth && ly > -1 && ly < canvasHeight ) {

        setPixelAdditive( lx, ly, r, g, b, a );

      }

      if ( ( lx === x2 ) && ( ly === y2 ) )
        break;

      let e2 = 2 * err;

      if ( e2 > -dx ) {

        err -= dy;
        lx += sx;

      }

      if ( e2 < dy ) {

        err += dx;
        ly += sy;

      }

    }

  }

  //---

  function addColorLookupTable( colorLookupTable, colorRangeMin, colorRangeMax, colorRGBStart, colorRGBEnd ) {

    let colorHexStart = rgbToHex( colorRGBStart.r, colorRGBStart.g, colorRGBStart.b );
    let colorHexEnd = rgbToHex( colorRGBEnd.r, colorRGBEnd.g, colorRGBEnd.b );

    let colorRange = [];
    let colorEndValues = [];

    let percent;

    let i, l, j, k;

    for ( i = 0, l = 100; i <= l; i++ ) {

      percent = i / 100;

      colorRange.push( shadeBlend( percent, colorHexStart, colorHexEnd ) );

    }

    for ( i = 0, l = colorRangeMax - colorRangeMin; i <= l; i++ ) {

      let index = i + colorRangeMin;

      colorEndValues.push( colorRange[ index ] );

    }

    for ( i = 0, l = colorEndValues.length; i < l; i++ ) {

      colorRange = [];

      for ( j = 0, k = 100; j <= k; j++ ) {

        percent = j / 100;

        colorRange.push( hexToRgb( shadeBlend( percent, colorHexStart, colorEndValues[ i ] ) ) );


      }

      colorLookupTable.push( colorRange );

    }

  }

  //---

  function getStarPosition( radius, sideLength ) {

    let x = Math.random() * sideLength - ( sideLength / 2 );
    let y = Math.random() * sideLength - ( sideLength / 2 );

    if ( radius > 0 ) {

      while ( Math.sqrt( x * x + y * y ) < radius ) {

        x = Math.random() * sideLength - ( sideLength / 2 );
        y = Math.random() * sideLength - ( sideLength / 2 );

      }

    }

    return { x: x, y: y };

  }

  function addStar( x, y, z, ox, oy, oz ) {

    let star = {};
    star.x = x;
    star.y = y;
    star.z = z;
    star.ox = ox;
    star.oy = oy;
    star.x2d = 0;
    star.y2d = 0;

    return star;

  }

  function addStars() {

    let i;

    let x, y, z;

    let star, starPosition;

    for ( i = 0; i < starBgCount; i++ ) {

      starPosition = getStarPosition( 0, 20000 );

      x = starPosition.x;
      y = starPosition.y;
      z = Math.round( Math.random() * starDistance );

      star = addStar( x, y, z, x, y, z );
      star.colorIndex = Math.floor( Math.random() * starBgColorLookupTable.length );
      star.colorLookupTable = starBgColorLookupTable[ star.colorIndex ];
      star.color = star.colorLookupTable[ Math.floor( Math.random() * 100 ) ];

      starBgHolder.push( star );

    }

    for ( i = 0; i < starCount; i++ ) {

      starPosition = getStarPosition( starWarpTunnelDiameter, 10000 );

      x = starPosition.x;
      y = starPosition.y;
      z = Math.round( Math.random() * starDistance );

      star = addStar( x, y, z, x, y, z );
      star.distance = starDistance - z;
      star.distanceTotal = Math.round( starDistance + starFov );
      star.colorIndex = Math.floor( Math.random() * starColorLookupTable.length );
      star.colorLookupTable = starColorLookupTable[ star.colorIndex ];
      star.color = star.colorLookupTable[ Math.floor( ( star.distance / star.distanceTotal ) * 100 ) ];

      starHolder.push( star );

    }

  }

  //---

  window.requestAnimFrame = ( function() {

    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function( callback ) {
        window.setTimeout( callback, 1000 / 60 );
      };

  } )();

  function animloop() {

    requestAnimFrame( animloop );

    if ( !paused ) {

      render();

    }

  }

  //---

  function render() {

    clearImageData();

    //---

    let i, j, l, k, m, n;

    //---

    let star;
    let scale;

    //---

    if ( starRotationPermission ) {

      if ( mouseDown ) {

        starRotationAnimationTime += 1;

        if ( starRotationAnimationTime > starRotationAnimationDuration )
          starRotationAnimationTime = starRotationAnimationDuration;

      } else {

        starRotationAnimationTime -= 1;

        if ( starRotationAnimationTime < 0 )
          starRotationAnimationTime = 0;

      }

      starRotationSpeed = Math.easeOutQuad( starRotationAnimationTime, starRotationSpeedMin, starRotationSpeedMax, starRotationAnimationDuration );
      starRotation -= starRotationSpeed * starRotationDirection;

    }

    //---

    if ( mouseActive ) {

      starSpeedAnimationTime += 1;

      if ( starSpeedAnimationTime > starSpeedAnimationDuration )
        starSpeedAnimationTime = starSpeedAnimationDuration;

      starFovAnimationTime -= 1;

      if ( starFovAnimationTime < 0 )
        starFovAnimationTime = 0;

      //---

      if ( starFollowMouseXAxis ) {

        center.x += ( mousePos.x - center.x ) * starFollowMouseSensitivity;

      }

      if ( starFollowMouseYAxis ) {

        center.y += ( mousePos.y - center.y ) * starFollowMouseSensitivity;

      }

    } else {

      starSpeedAnimationTime -= 1;

      if ( starSpeedAnimationTime < 0 )
        starSpeedAnimationTime = 0;

      starFovAnimationTime += 1;

      if ( starFovAnimationTime > starFovAnimationDuration )
        starFovAnimationTime = starFovAnimationDuration;

      //---

      if ( starFollowMouseXAxis ) {

        center.x += ( ( canvas.width / 2 ) - center.x ) * starFollowMouseSensitivity;

      }

      if ( starFollowMouseYAxis ) {

        center.y += ( ( canvas.height / 2 ) - center.y ) * starFollowMouseSensitivity;

      }

    }

    starSpeed = Math.easeOutQuad( starSpeedAnimationTime, 0, starSpeedMax - starSpeedMin, starSpeedAnimationDuration ) + starSpeedMin;
    starFov = Math.easeInQuad( starFovAnimationTime, 0, starFovMax - starFovMin, starFovAnimationDuration ) + starFovMin;

    //---

    starBorderFront = -starFov + 1;

    //---

    let warpSpeedValue = starSpeed * ( starSpeed / ( starSpeedMax / starWarpLineLength ) );

    //---
    //stars bg

    for ( i = 0, l = starBgHolder.length; i < l; i++ ) {

      star = starBgHolder[ i ];

      scale = starFov / ( starFov + star.z );

      star.x2d = ( star.x * scale ) + center.x;
      star.y2d = ( star.y * scale ) + center.y;

      if ( star.x2d > -1 && star.x2d < canvasWidth && star.y2d > -1 && star.y2d < canvasHeight ) {

        setPixelAdditive( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

      }

    }

    //---
    //stars moving

    for ( i = 0, l = starHolder.length; i < l; i++ ) {

      star = starHolder[ i ];

      //---
      //star distance calc

      star.distanceTotal = Math.round( starDistance + starFov );

      //---
      //star movement

      if ( starDirection >= 0 ) {

        star.z -= starSpeed;
        star.distance += starSpeed;

        if ( star.z < starBorderFront ) {

          star.z = starBorderBack;
          star.distance = 0;

        }

      } else {

        star.z += starSpeed;
        star.distance -= starSpeed;

        if ( star.z > starBorderBack ) {

          star.z = starBorderFront;
          star.distance = star.distanceTotal;

        }

      }

      //---
      //star color

      star.color = star.colorLookupTable[ Math.floor( ( star.distance / star.distanceTotal ) * 100 ) ];

      //---
      //star position & draw

      scale = starFov / ( starFov + star.z );

      star.x2d = ( star.x * scale ) + center.x;
      star.y2d = ( star.y * scale ) + center.y;

      if ( starSpeed === starSpeedMin ) {

        if ( star.x2d > -1 && star.x2d < canvasWidth && star.y2d > -1 && star.y2d < canvasHeight ) {

          setPixelAdditive( star.x2d | 0, star.y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

        }

      } else {

        let nz = star.z + warpSpeedValue;

        scale = starFov / ( starFov + nz );

        let x2d = ( star.x * scale ) + center.x;
        let y2d = ( star.y * scale ) + center.y;

        if ( x2d > -1 && x2d < canvasWidth && y2d > -1 && y2d < canvasHeight ) {

          drawLine( star.x2d | 0, star.y2d | 0, x2d | 0, y2d | 0, star.color.r, star.color.g, star.color.b, 255 );

        }

      }

      //---
      //star rotation

      if ( starRotationSpeed !== starRotationSpeedMin ) {

        let radians = MATHPI180 * starRotation;

        let cos = Math.cos( radians );
        let sin = Math.sin( radians );

        star.x = cos * star.ox + sin * star.oy;
        star.y = cos * star.oy - sin * star.ox;

      }

    }

    //---

    ctx.putImageData( imageData, 0, 0 );

  }

  function resizeHandler( event ) {

    resize();

  }

  function resize() {

    canvasWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvasHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if ( settings.autoResizeMinWidth && canvasWidth < settings.autoResizeMinWidth ) {

      canvasWidth = settings.autoResizeMinWidth;

    } else if ( settings.autoResizeMaxWidth && canvasWidth > settings.autoResizeMaxWidth ) {

      canvasWidth = settings.autoResizeMaxWidth;

    }

    if ( settings.autoResizeMinHeight && canvasHeight < settings.autoResizeMinHeight ) {

      canvasHeight = settings.autoResizeMinHeight;

    } else if ( settings.autoResizeMaxHeight && canvasHeight > settings.autoResizeMaxHeight ) {

      canvasHeight = settings.autoResizeMaxHeight;

    }

    //---

    canvas.setAttribute( 'width', canvasWidth );
    canvas.setAttribute( 'height', canvasHeight );

    center = { x: canvas.width / 2, y: canvas.height / 2 };

    //---

    imageData = ctx.getImageData( 0, 0, canvasWidth, canvasHeight );
    pix = imageData.data;

  }

  //---

  function mouseMoveHandler( event ) {

    mousePos = getMousePos( canvas, event );

  }

  function mouseEnterHandler( event ) {

    mouseActive = true;

  }

  function mouseLeaveHandler( event ) {

    mouseActive = false;
    mouseDown = false;

  }

  function mouseDownHandler( event ) {

    mouseDown = true;

  }

  function mouseUpHandler( event ) {

    mouseDown = false;

  }

  //---

  function getMousePos( canvas, event ) {

    let rect = canvas.getBoundingClientRect();

    return { x: event.clientX - rect.left, y: event.clientY - rect.top };

  }

  //---

  function touchStartHandler( event ) {

    event.preventDefault();

    mouseDown = true;
    mouseActive = true;

  }

  function touchEndHandler( event ) {

    event.preventDefault();

    mouseDown = false;
    mouseActive = false;

  }

  function touchMoveHandler( event ) {

    event.preventDefault();

    mousePos = getTouchPos( canvas, event );

  }

  function touchCancelHandler( event ) {

    mouseDown = false;
    mouseActive = false;

  }

  //---

  function getTouchPos( canvas, event ) {

    let rect = canvas.getBoundingClientRect();

    return { x: event.touches[ 0 ].clientX - rect.left, y: event.touches[ 0 ].clientY - rect.top };

  }

  //---

  this.pause = function() {

    paused = true;

  };

  this.unpause = function() {

    paused = false;

  };

  //---

  init();

}