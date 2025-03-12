db.research.updateMany({}, [{
  $set: {
    json_content: {
      $function: {
        lang: "js",
        args: ["$json_content"],
        body: "function(infoStr) { return JSON.parse(infoStr); }"
      }
    }
  }
}]);
