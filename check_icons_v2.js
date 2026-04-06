const lucide = require('lucide-react');
const icons = Object.keys(lucide);
console.log('Total icons found:', icons.length);
console.log('Sample icons:', icons.slice(0, 50));
console.log('Social-like icons:', icons.filter(k => 
  /insta|face|yout|twit|soc|brand|meta|logo/i.test(k)
));
