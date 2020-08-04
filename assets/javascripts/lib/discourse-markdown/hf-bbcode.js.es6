import { registerOption } from "pretty-text/pretty-text";

registerOption(
  (siteSettings, opts) => (opts.features["vbulletin-bbcode"] = true)
);


function wrap(tag, attr, callback) {
  return function(startToken, finishToken, tagInfo) {
    startToken.tag = finishToken.tag = tag;
    startToken.content = finishToken.content = "";

    startToken.type = "bbcode_open";
    finishToken.type = "bbcode_close";

    startToken.nesting = 1;
    finishToken.nesting = -1;

    startToken.attrs = [
      [attr, callback ? callback(tagInfo) : tagInfo.attrs._default]
    ];
  };
}

function setupMarkdownIt(md) {
  const ruler = md.inline.bbcode.ruler;



md.core.textPostProcess.ruler.push('onlyfastcars', {
   matcher: /(\[w=(\w*)\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
        let line1 = new state.Token('text', '', 0);
        let line2 = new state.Token('text', '', 0);
        let line3 = new state.Token('text', '', 0);
        let line4 = new state.Token('text', '', 0);
        let line5 = new state.Token('text', '', 0);
        let line6 = new state.Token('text', '', 0);

        let link_welcome = new state.Token('a', 'a', 1);
        link_welcome.attrs = [['href', 'https://hackflag.org/t/welkom-op-hackflag/14681']];
        let link_welcome_text = new state.Token('text', '', 0);
        let link_regels = new state.Token('a', 'a', 1);
        link_regels.attrs = [['href', 'https://hackflag.org/guidelines']];
        let link_regels_text = new state.Token('text', '', 0);
        let link_begin = new state.Token('a', 'a', 1);
        link_begin.attrs = [['href', 'https://hackflag.org/t/waar-moet-ik-beginnen/14678']];
        let link_begin_text = new state.Token('text', '', 0);
        let link_tuts = new state.Token('a', 'a', 1);
        link_tuts.attrs = [['href', 'https://hackflag.org/page/tutorials/1']];
        let link_tuts_text = new state.Token('text', '', 0);
        let close_link = new state.Token('a_close', 'a', -1);

        let ul = new state.Token('ul_open', 'ul', 1);
        let close_ul = new state.Token('ul_close', 'ul', -1);
        let li = new state.Token('li_open', 'li', 1);
        let close_li = new state.Token('li_close', 'li', -1);

        //let break = new state.Token('soft_break', 'br', 0);
        
        line1.content = "Beste " + matches[2] + ",";
        line2.content = "Welkom op HackFlag! Leuk dat je hier een account hebt aangemaakt.";
        line3.content = "Hier wat handige links:";
        link_welcome_text.content = "Welkom op HackFlag!";
        link_regels_text.content = "De regels en richtlijnen op HackFlag";
        link_begin_text.content = "Waar moet ik beginnen?";
        link_tuts_text.content = "De tutorialpagina.";
        line4.content = "Deze links vind je ook helemaal onderaan elke pagina.";
        line5.content = "Verder hopen we natuurlijk dat je het hier erg naar je zin zult hebben :)";
        line6.content = "Als je vragen hebt, laat maar weten!";
	    buffer.push(line1);
        buffer.push(new state.Token('soft_break', 'br', 0));
        buffer.push(new state.Token('soft_break', 'br', 0));
        buffer.push(line2);
        buffer.push(new state.Token('soft_break', 'br', 0));
        buffer.push(line3);
        buffer.push(ul)
        buffer.push(li,link_welcome, link_welcome_text, close_link, close_li);
        buffer.push(li,link_regels, link_regels_text, close_link, close_li);
        buffer.push(li,link_begin, link_begin_text, close_link, close_li);
        buffer.push(li,link_tuts, link_tuts_text, close_link, close_li);
        buffer.push(close_link);
        buffer.push(close_li);
        buffer.push(close_ul);
        buffer.push(new state.Token('soft_break', 'br', 0));
   	    buffer.push(line4);
        buffer.push(new state.Token('soft_break', 'br', 0));
   	    buffer.push(line5);
        buffer.push(new state.Token('soft_break', 'br', 0));
   	    buffer.push(line6);
	}
});

md.core.textPostProcess.ruler.push('tutwarn', {
   matcher: /(\[tutwarn\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
        let divtutwarn = new state.Token('div_open', 'div', 1);
        divtutwarn.attrs = [['class', 'tutwarn']];
        let divclose = new state.Token('div_close', 'div', -1);
        let bold_open = new state.Token('b_open', 'b', 1);
        let bold_close = new state.Token('b_close', 'b', -1);
        let font_open = new state.Token('font_open', 'font', 1);
        font_open.attrs = [['color', 'red']];
        let font_close = new state.Token('font_close', 'font', -1);

        let waarschuwing = new state.Token('text', '', 0);
        waarschuwing.content = "WAARSCHUWING!";
      
        let tutwarntext = new state.Token('text', '', 0);
        tutwarntext.content = "Deze tutorial is alleen bedoeld voor educatieve doeleinden. Het is streng verboden om de tutorial en de informatie in deze tutorial te gebruiken voor andere (illegale) doeleinden. Het is uitsluitend toegestaan om de informatie uit deze tutorial te gebruiken en/of toe te passen als alle betrokken partijen/mensen hiervoor toestemming hebben gegeven. Het is streng verboden om de informatie uit deze tutorial te gebruiken op apparatuur (en andere eigendommen) van andere mensen zonder dat deze mensen hiervoor toestemming hebben gegeven. HackFlag, de eigenaar/oprichter van HackFlag, het bestuur van HackFlag en ik zelf zijn op geen enkele voorwaarde aansprakelijk voor de eventuele schade in welke vorm dan ook die kan worden opgelopen bij het gebruik van (de informatie uit) deze tutorial. Indien blijkt dat jij deze informatie hebt misbruikt kun je geschorst worden van HackFlag.";

	    buffer.push(divtutwarn);
        buffer.push(bold_open, font_open);
        buffer.push(waarschuwing);    
        buffer.push(bold_close, font_close);
        buffer.push(new state.Token('soft_break', 'br', 0));
        buffer.push(new state.Token('soft_break', 'br', 0));
        buffer.push(tutwarntext);
	    buffer.push(divclose);
	}
});


md.core.textPostProcess.ruler.push('rtbp', {
   matcher: /(\[rtbp\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
	    let gif = new state.Token('img_open', 'img', 0);
        gif.attrs = [['src', 'https://hackflag.org/uploads/default/original/1X/cd8a26567f21483cd31e68d2fa3c49c11ff317e1.gif']];
	    buffer.push(gif);
	}
});

md.core.textPostProcess.ruler.push('regels', {
   matcher: /(\[regels\]|\[rules\]|\[guidelines\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
        let link_regels = new state.Token('a', 'a', 1);
        link_regels.attrs = [['href', 'https://hackflag.org/guidelines']];
	    let link_regels_text = new state.Token('text', '', 0);
        link_regels_text.content = "De regels zijn hier te vinden (klik)";
        let link_close = new state.Token('a_close', 'a', -1);
        buffer.push(link_regels, link_regels_text, link_close);
	}
});

md.core.textPostProcess.ruler.push('spoiler', {
   matcher: /(\[spoilertje(=(\w*))?\](.*)\[\/spoilertje\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
	    let description = new state.Token('text', '', 0);
	    let textinspoiler = new state.Token('text', '', 0);
        textinspoiler.content = matches[4];
        //temp.content = "Yoooo" + JSON.stringify(matches);
        if(!matches[3]){
           description.content = "Spoiler (klik)";
        }
        else {
           description.content = matches[3] + " (klik)";
        }
	    let details_open = new state.Token('details_open', 'details', 1);
	    let details_close = new state.Token('details_close', 'details', -1);

	    let summary_open = new state.Token('summary_open', 'summary', 1);
	    let summary_close = new state.Token('summary_close', 'summary', -1);
        
	    buffer.push(details_open, summary_open, description, summary_close, textinspoiler, details_close);
	}
});


md.core.textPostProcess.ruler.push('onlyfastcarso', {
   matcher: /(\[align=([a-z]*)\](.*)\[\/align\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
	    let alignstring = "text-align:" + matches[2] + ";";
	    let p_open = new state.Token('p_open', 'p', 1);
        //p_open.attrs = [['style', alignstring]];
	    let p_close = new state.Token('p_close', 'p', -1);
	    
 		let inalign = new state.Token('text', '', 0);
        inalign.content = matches[3];
		//token.content = JSON.stringify(matches);
        
        
	    buffer.push(p_open, inalign, p_close);
	}
});

md.core.textPostProcess.ruler.push('onlyfastcarso', {
   matcher: /(\[warnuso=([a-z]*)\])/,  //regex flags are NOT supported
   onMatch: function(buffer, matches, state) {
	    let token = new state.Token('text', '', 0);
	    //token.content = JSON.stringify(matches);
        token.content = matches[2];
        //token.content = "WAARSCHUWING";
	    buffer.push(token);
	}
});


}

export function setup(helper) {
  helper.whiteList([
    "div.tutwarn",
    "div.eduwarn",
    "div.sepquote",
    "span.smallfont",
    "blockquote.indent",
    "font[color=*]",
    "font[size=*]",
    "font[face=*]",
    "ol[type=*]",
    "details",
    "summary",
  ]);

  helper.whiteList({
    custom(tag, name, value) {
      if (tag === "span" && name === "style") {
        return /^(font-size:(xx-small|x-small|small|medium|large|x-large|xx-large)|background-color:#?[a-zA-Z0-9]+)$/.exec(
          value
        );
      }

      if (tag === "div" && name === "style") {
        return /^text-align:(center|left|right)$/.exec(value);
      }
    }
  });

  if (helper.markdownIt) {
    helper.registerPlugin(setupMarkdownIt);
    return;
  }

  const builders = requirejs("pretty-text/engines/discourse-markdown/bbcode")
    .builders;
  const {
    register,
    replaceBBCode,
    rawBBCode,
    replaceBBCodeParamsRaw
  } = builders(helper);

  replaceBBCode("small", contents =>
    ["span", { style: "font-size:x-small" }].concat(contents)
  );
  replaceBBCode("highlight", contents =>
    ["div", { class: "highlight" }].concat(contents)
  );

  ["left", "center", "right"].forEach(direction => {
    replaceBBCode(direction, contents =>
      ["div", { style: "text-align:" + direction }].concat(contents)
    );
  });

  replaceBBCode("edit", contents =>
    [
      "div",
      { class: "sepquote" },
      ["span", { class: "smallfont" }, "Edit:"],
      ["br"],
      ["br"]
    ].concat(contents)
  );

  replaceBBCode("ot", contents =>
    [
      "div",
      { class: "sepquote" },
      ["span", { class: "smallfont" }, "Off Topic:"],
      ["br"],
      ["br"]
    ].concat(contents)
  );

  replaceBBCode("indent", contents => ["blockquote", ["div"].concat(contents)]);

  contents = "Hallo allemaal";

  helper.addPreProcessor(replaceFontColor);
  helper.addPreProcessor(replaceTest);
  helper.addPreProcessor(replaceFontSize);
  helper.addPreProcessor(replaceFontFace);
  helper.addPostProcessor(lolTest);

  register("aname", (contents, param) =>
    ["a", { name: param, "data-bbcode": true }].concat(contents)
  );
  register("jumpto", (contents, param) =>
    ["a", { href: "#" + param, "data-bbcode": true }].concat(contents)
  );
  register("rule", (contents, param) => [
    "div",
    {
      style:
        "margin: 6px 0; height: 0; border-top: 1px solid " +
        contents +
        "; margin: auto; width: " +
        param
    }
  ]);

  rawBBCode("noparse", contents => contents);
  rawBBCode("fphp", contents => [
    "a",
    {
      href: "http://www.php.net/manual-lookup.php?function=" + contents,
      "data-bbcode": true
    },
    contents
  ]);
  replaceBBCodeParamsRaw("fphp", (param, contents) => [
    "a",
    {
      href: "http://www.php.net/manual-lookup.php?function=" + param,
      "data-bbcode": true
    },
    contents
  ]);

  rawBBCode("google", contents => [
    "a",
    { href: "http://www.google.com/search?q=" + contents, "data-bbcode": true },
    contents
  ]);

  helper.replaceBlock({
    start: /\[tutwarno\]/gim,
    stop: /\[\/tutwarno\]/gim,
    emitter(blockContents, matches) {
      const contents = "Looool";

      return contents;
    }
  });

  helper.replaceBlock({
    start: /\[list=?(\w)?\]([\s\S]*)/gim,
    stop: /\[\/list\]/gim,
    emitter(blockContents, matches) {
      const contents = matches[1] ? ["ol", { type: matches[1] }] : ["ul"];

      if (blockContents.length) {
        blockContents.forEach(bc => {
          const lines = bc.split(/\n/);
          lines.forEach(line => {
            if (line.indexOf("[*]") === 0) {
              const li = this.processInline(line.slice(3));
              if (li) {
                contents.push(["li"].concat(li));
              }
            }
          });
        });
      }

      return contents;
    }
  });
}
