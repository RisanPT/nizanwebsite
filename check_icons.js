const lucide = require('lucide-react');
const icons = Object.keys(lucide).filter(key => key.toLowerCase().includes('spark') || key.toLowerCase().includes('party') || key.toLowerCase().includes('camera'));
console.log('Found icons:', icons);
