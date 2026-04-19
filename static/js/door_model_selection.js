var door_object = {
    "CARRIAGE HOUSE": {
      "Steel": ["Amarr Carriage Court", "Amarr Classica®", "Amarr Hillcrest", "Amarr Heritage®", "Amarr Designer`s Choice", "Amarr by Design"]
    },
    "TRADITIONAL": {
      "Steel": ["Amarr Heritage®", "Amarr Lincoln", "Amarr Olympus"]
    },
    "SPECIALITY": {
      "Steel": ["Amarr Classica® Full View"],
      "Aluminium": [ "Amarr Horizon", "Amarr Vista"]
    }
}
window.onload = function () {
    var style_sel = document.getElementById("style");
    var material_sel = document.getElementById("material");
    var model_sel = document.getElementById("model");    

    for (var x in door_object) {
        if(style_sel){
            style_sel.options[style_sel.options.length] = new Option(x, x);
        }        
    }
    if(style_sel){
      style_sel.onchange = function () {
          //empty Chapters- and Topics- dropdowns
          model_sel.length = 1;
          material_sel.length = 1;

          //display correct values
          for (var y in door_object[this.value]) {
                  material_sel.options[material_sel.options.length] = new Option(y, y);
          }
      }
    }
    if(material_sel){
      material_sel.onchange = function () {
          //empty Chapters dropdown
          model_sel.length = 1;

          //display correct values
          var z = door_object[style_sel.value][this.value];
          for (var i = 0; i < z.length; i++) {
              model_sel.options[model_sel.options.length] = new Option(z[i], z[i]);
          }
      }
    }
}