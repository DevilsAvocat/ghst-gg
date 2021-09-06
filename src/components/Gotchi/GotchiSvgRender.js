import Moralis from "moralis";

export default { 
    async getSvg(gotchies) {
        let result = await Moralis.Cloud.run("getSVG",{gotchies});
        
        function htmlToElement(html) {
            var template = document.createElement('template');
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            return template.content.firstChild;
        }

        return result.map((item) => {
            return htmlToElement(item);
            return new DOMParser().parseFromString(item, "text/xml");
        });
    }
}