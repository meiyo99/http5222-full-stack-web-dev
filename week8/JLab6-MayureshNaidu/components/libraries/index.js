import { JSDOM } from "jsdom";

var xml;

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/library-data.kml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    const data = new JSDOM(await response.text(), { contentType: "application/xml" });
    xml = data.window.document;
  }
  return xml;
}

async function loadLibraries() {
  xml = await loadXml();
  return xml.querySelectorAll("Placemark");
}

async function getLibraryById(id) {
  xml = await loadXml();
  return xml.getElementById(id);
}

export default {
  loadLibraries,
  getLibraryById
};