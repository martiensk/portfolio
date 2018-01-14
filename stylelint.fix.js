const stylelint = require('stylelint');
const path = require('path');

stylelint.lint({
    files: path.join(__dirname, 'styles', '*'),
    fix: true
});