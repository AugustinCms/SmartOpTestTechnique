/**
 * Sort the data to be used in the front-end
 *
 * @param {Array} data - The array of operation data
 * @returns {Array} The sorted data array
 */

function sortData(data) {
  result = [];

  for (var i = 0; i < data.length; i++) {
    data[i].operationCount = 1;
    data[i].favoriteAnesthesiste = "";
    if (
      result.find((result) => result.surgeon == data[i].surgeon) !== undefined
    ) {
      for (var j = 0; j < result.length; j++) {
        if (result[j].surgeon == data[i].surgeon) {
          result[j].operationCount += 1;
        }
      }
    } else {
      result.push({
        surgeon: data[i].surgeon,
        operationCount: data[i].operationCount,
        favoriteAnesthesiste: findFavorite(
          data,
          data[i].surgeon,
          "anesthsiste"
        ),
        favoriteNurse: findFavorite(data, data[i].surgeon, "nurse"),
        favoriteRoom: findFavorite(data, data[i].surgeon, "room"),
        favoriteIntervention: findFavorite(
          data,
          data[i].surgeon,
          "intervention"
        ),
      });
    }
  }
  return result;
}


/**
 * Finds the most frequent value for a given surgeon and field type.
 *
 * @param {Array} data - The array of operation data
 * @param {string} surgeon - The surgeon name
 * @param {string} type - The field type to analyze ("anesthsiste", "room", etc)
 * @returns {string} The most frequent value for the given surgeon and field type
 */

function findFavorite(data, surgeon, type) {
  var j = 1;
  var favorite = "";
  var count = 1;
  var max = 0;
  var dataArray = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].surgeon == surgeon) {
      if (type === "anesthsiste") dataArray.push(data[i].anesthsiste);
      else if (type === "room") dataArray.push(data[i].roomNumber);
      else if (type === "intervention") dataArray.push(data[i].intervention);
      else if (type === "nurse") {
        dataArray.push(data[i].nurse1);
        dataArray.push(data[i].nurse2);
      }
    }
  }
  dataArray.sort();
  for (; j <= dataArray.length; ++j) {
    if (dataArray[j] == dataArray[j - 1] && dataArray[j] != "") {
      count++;
    } else {
      if (count > max) {
        max = count;
        favorite = dataArray[j - 1];
      }
      count = 1;
    }
  }
  if (favorite == "") favorite = dataArray[j - 2];
  return favorite;
}

module.exports = sortData;
