// Helper functions for manipulating XML documents.
const { DOMParser, XMLSerializer } = require('xmldom');

// Get empty XML Document.
const createXMLDocument = (tag = 'root') => {
  const root = `<${tag}></${tag}>`;
  const xmlParser = new DOMParser();
  return xmlParser.parseFromString(root, 'text/xml');
};

// Create element with value.
const createXMLElement = (xmlDoc, tag, value) => {
  const element = xmlDoc.createElement(tag);
  const textNode = xmlDoc.createTextNode(value);
  element.appendChild(textNode);
  return element;
};

// Append element to target element.
const appendXMLChild = (target, child) => {
  target.appendChild(child);
  return target;
};

// Append element to XMLDocument's root.
const appendXMLElement = (xmlDoc, tag, child) => {
  const target = xmlDoc.getElementsByTagName(tag)[0];
  appendXMLChild(target, child);
};

// Serialize xml back into a string.
const stringify = (xmlDoc) => {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
};

// Export functionality.
module.exports = {
  createXMLDocument,
  createXMLElement,
  appendXMLElement,
  appendXMLChild,
  stringify,
};
