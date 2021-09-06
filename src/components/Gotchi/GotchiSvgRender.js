import Moralis from "moralis";

export default { 
    async getSvg(gotchies) {
        let result = await Moralis.Cloud.run("getSVG",{gotchies});
        
        function htmlToElement(html) {
            var template = document.createElement('template');
            html = html.trim();
            template.innerHTML = html;

            return template.content.firstChild;
        }

        return result.map((item, index) => {
            let regex = /<style>(.*?)<\/style>/g,
                regexClass = /\.(.*?)\}/g;

            let result = item.match(regex).map((val) => {
                return val.replace(/<\/?style>/g,'');
             });
             result = result[0].match(regexClass).map((styleBlock) => {
                return `.gotchi-svg-${gotchies[index].id} ${styleBlock}`;
             }).join('')

            return htmlToElement(item.replace(regex, `<style>${result}</style>`));
        });
    }
}
