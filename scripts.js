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
        try {
          // Make API call and parse response
          const response = await fetch(`https://www.dnd5eapi.co/api/spells/${url}`);
          const spell = await response.json();
      
          // Update HTML elements with spell information
          const name = spell.name + (spell.ritual ? " &#174" : "") + (spell.concentration ? " &#169" : "");
          document.getElementById("name").innerHTML = `<strong>${name}</strong>`;
          document.getElementById("level").innerHTML = `<strong>Level: </strong><br>${spell.level}`;
          document.getElementById("rangeArea").innerHTML = `<strong>Range: </strong><br>${spell.range}`;
          document.getElementById("duration").innerHTML = `<strong>Duration: </strong><br>${spell.duration}`;
          document.getElementById("school").innerHTML = `<strong>School: </strong><br>${spell.school.name}`;
          document.getElementById("castingtime").innerHTML = `<strong>Casting time: </strong><br>${spell.casting_time}`;
          document.getElementById("components").innerHTML = `<strong>Components:</strong><br>${replaceAll(JSON.stringify(spell.components))}`;
          document.getElementById("attackSave").innerHTML = `<strong>Attack/Save: </strong><br>${spell.dc ? spell.dc.dc_type.name : spell.attack_type ? spell.attack_type.charAt(0).toUpperCase() + spell.attack_type.slice(1) : "None"}`;
          document.getElementById("damageEffect").innerHTML = `<strong>Damage/Effect: </strong><br>${spell.damage ? spell.damage.damage_type.name : "None"}`;
          document.getElementById("info").innerHTML = replaceInfo(JSON.stringify(spell.desc));
          
          // Display spell classes and subclasses
          const spellClasses = spell.classes.concat(spell.subclasses);
          const spellClassesList = document.getElementById("tags");
          spellClassesList.innerHTML = "";
          for (const spellClass of spellClasses) {
            const listItem = document.createElement("div");
            listItem.textContent = replaceAll(JSON.stringify(spellClass.name));
            spellClassesList.appendChild(listItem);
          }
        } catch (error) {
          console.log(`Error retrieving spell information: ${error}`);
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