export function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
  
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
    return `#${r}${g}${b}`;
  }
  
  // Helper function to generate random light background color
  export function getRandomLightColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;  // Fixed saturation
    const lightness = 90; // Lightness for light color
    return hslToHex(hue, saturation, lightness);
  }
  
  // Helper function to generate random dark text color in HEX
  export function getRandomDarkColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;  // Fixed saturation
    const lightness = 30; // Lightness for dark color
    return hslToHex(hue, saturation, lightness);
  }
  
  export function getContentFromReceiver(receiver) {
    if(receiver){
      const [first, last] = receiver.split(' ');
      return `${first.charAt(0).toUpperCase()}${last ? last.charAt(0).toUpperCase() : ''}`;
    }
  }
  
  // Convert stored UTC timestamp to local timezone for display
  export function convertUTCtoLocal(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts to local time
  }
  