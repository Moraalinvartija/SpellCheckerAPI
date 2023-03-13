async function getDataFromAPI(url) {                                            //kokeilua
    let obj = await fetch(url);
    let spells = await obj.text();
     let spells2 =JSON.parse(spells);
    
    }
    const url = "https://www.dnd5eapi.co/api/spells";
    getDataFromAPI(url);
    
    async function fetchData() {
    
    let obj = await fetch('https://www.dnd5eapi.co/api/spells/');
    let spells = await obj.text();
    let spells2 =JSON.parse(spells);
    
    }
    fetchData();
    const url2 = "";
 
    $(document).ready(function() {      //get options for 
        // The things we want to get
        const fetchItems = [{
            "endpoint": "/spells",
            "id": "#spell"
          }
        ];
        // For each category to fetch
        $.each(fetchItems, function(i, item) {
          // Get the data
          $.get("https://www.dnd5eapi.co/api" + item.endpoint, function(data) {
            // For each row in the data
            $.each(data.results, function(j, row) {
              // Create a new option in the corresponding <select>
              $(item.id).append($("<option>", {
                value: row.index,
                text: row.name
              }));
            });
          });
        });
      });

      async function getSpellFromAPI(url) {
        del();    
        let obj2 = await fetch("https://www.dnd5eapi.co/api/spells/" + url);
        let  target= await obj2.text();
        let target2 =JSON.parse(target);
         console.log("https://www.dnd5eapi.co/api/spells/" + url)
        checkConcentrationRitual(target2);
        document.getElementById("level").innerHTML = "<strong>Level: </strong>" + "<br>"+ target2.level;
        document.getElementById("rangeArea").innerHTML = "<strong>Range: </strong>"+ "<br>" + target2.range;
        document.getElementById("duration").innerHTML = "<strong>Duration: </strong>"+ "<br>" + target2.duration;
        document.getElementById("school").innerHTML = "<strong>School: </strong>" + "<br>" + target2["school"]["name"];
        document.getElementById("components").innerHTML = "<strong>Components:</strong> "+ "<br>" + replaceAll(JSON.stringify(target2["components"]));
        checkAttack(target2);
        checkDamage(target2);
        document.getElementById("castingtime").innerHTML ="<strong>Casting time: </strong>"+ "<br>"+ target2.casting_time;

        document.getElementById("info").innerHTML = replaceInfo(JSON.stringify(target2.desc));
        const dndClass = target2.classes;
        const subClass= target2.subclasses;
        const myList = document.getElementById("tags");
        for (const power of dndClass) {
          const listItem = document.createElement('div');
          listItem.textContent = replaceAll(JSON.stringify(power["name"]));
          myList.appendChild(listItem);
        }
        for (const power of subClass) {
          const listItem = document.createElement('div');
          listItem.textContent = replaceAll(JSON.stringify(power["name"]));
          myList.appendChild(listItem);
        }
        }
      function myFunction() {
        var x = document.getElementById("spell").selectedIndex;
        var z = document.getElementsByTagName("option")[x].value;
        getSpellFromAPI(z);
    }
function replaceAll(string) {
  return string.split('[').join('').split('"').join('').split(']').join('');
}
function replaceInfo(string) {
  return string.split('***').join('<br style="margin:5px"> ').split('[').join('').split('"').join('').split(']').join('');
}
function checkConcentrationRitual(spell) {
  var b = "<strong>" +spell.name + "</strong>";
if( spell["ritual"] === false && spell["concentration"] == false) {
  b;
}
if (spell["ritual"] !== false) {
  b = b + " &#174 ";
}
if (spell["concentration"] !== false) {
b = b + " &#169 ";
}
document.getElementById("name").innerHTML = b;
}
function checkAttack(A) { //check for spells attack/save for output
  if (A["dc"] == undefined && A["attack_type"] == undefined)   {
    document.getElementById("attackSave").innerHTML = "<strong>Attack/Save: </strong>" +"<br>"+ "None";
} else if (A["dc"] !== undefined) {
  document.getElementById("attackSave").innerHTML = "<strong>Attack/Save: </strong>" +"<br>"+ A["dc"]["dc_type"]["name"];
} else if (A["attack_type"] !== undefined) {
  document.getElementById("attackSave").innerHTML = "<strong>Attack/Save: </strong>" +"<br>"+ A["attack_type"].charAt(0).toUpperCase() + A["attack_type"].slice(1);
}
}
function checkDamage(A) {
  if (A["damage"] !== undefined) {
    document.getElementById("damageEffect").innerHTML = "<strong>Damage/Effect: </strong>" + "<br>" + A["damage"]["damage_type"]["name"];
  } else {
    document.getElementById("damageEffect").innerHTML = "<strong>Damage/Effect: </strong>" + "<br>" + "None";
  }
}
function del() {
  document.getElementById("tags").innerHTML = "";
}