const visit = require('unist-util-visit');
const {
  addAttribute,
  isMdxBlockElement,
  removeAttribute,
} = require('./utils/mdxast');

const callouts = () => (tree) => {
  visit(
    tree,
    (node) => {
      return (
        isMdxBlockElement('div', node) &&
        node.attributes.some(
          (attr) => attr.name === 'className' && attr.value.includes('callout-')
        )
      );
    },
    (div) => {
      const { value: className } = div.attributes.find(
        (attr) => attr.name === 'className'
      );
      const variant = className.replace('callout-', '');

      div.name = 'Callout';

      addAttribute('variant', variant, div);
      removeAttribute('className', div);
    }
  );
};

module.exports = callouts;
