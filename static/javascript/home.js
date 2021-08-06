$(window).on("load", function () {
  main();
});
function main() {
  $.ajax({
    type: "GET",
    url: "/get_tasks",
    success: function (response) {
      i = 0;
      response.data.forEach((element) => {
        i = i + 1;
        var task = $(".task.hide").clone();
        task.removeClass("hide");
        task.attr("data-id", element.id);
        task.find(".number h1").text(i);
        task.find(".title h1").text(element.title + ", " + element.description);
        task.find(".priority h1").text(element.priority);
        task.find(".date h1").text(element.date + ", " + element.time);
        //   task.find(".time h1").text(element.time);
        task.find(".status h1").text(element.status);
        task.find(".edit img").attr("data-id", element.id);
        task.find(".delete img").attr("data-id", element.id);
        $(".tasks").append(task);
      });
    },
  });
}
function edit_task(e) {
  call_popup();
  $("#add-add").css("display", "none");
  $("#add-save").css("display", "inline-block");
  var x = e.attr("data-id");
  var y = $(".task[data-id=" + x + "]");
  t = y.find(".title h1").text().split(",");
  $("#add-title").val(t[0]);
  $(".edit-id").val(x);
  tex = "";
  for (i = 1; i < t.length; i++) {
    tex += t[i];
  }
  tex = tex.trim();
  $("#add-des").val(tex);
  $("#add-priority").val(y.find(".priority h1").text());
  r = y.find(".date h1").text().split(",");
  tex = "";
  for (i = 1; i < r.length; i++) {
    tex += r[i];
  }
  $("#add-date").val(r[0]);
  tex = tex.trim();
  $("#add-time").val(tex.slice(0, 5));
  $("#add-status").val(y.find(".status h1").text());
  $(".submit-button button").text("Save");
  // location.reload();
}
function delete_task(e) {
  $.ajax({
    type: "GET",
    url: "/delete_task/?id=" + e.attr("data-id"),
    success: function (response) {
      console.log("working");
      task = $(".task[data-id='" + e.attr("data-id") + "']");
      task.remove();
    },
  });
}
function call_popup() {
  $("#add-add").css("display", "inline-block");
  $("#add-save").css("display", "none");
  $(".submit-button button").text("Add Task");
  var x = $(".pop-up.hide");
  $(".edit-id").val("");
  x.removeClass("hide");
  $("html").css("overflow", "hidden");
}
function cross() {
  var x = $(".pop-up");
  x.addClass("hide");
  $("#add-title").val("");
  $("#add-des").val("");
  $("#add-priority").val("Normal");
  $("#add-date").val("");
  $("#add-time").val("");
  $("#add-status").val("incomplete");
  $("html").css("overflow", "auto");
}
$(".adding").submit(function (e) {
  e.preventDefault();
  var title = $("#add-title").val();
  var des = $("#add-des").val();
  var priority = $("#add-priority").val();
  var date1 = $("#add-date").val();
  var time1 = $("#add-time").val();
  var status = $("#add-status").val();
  if ($(".edit-id").val() == "") {
    adding = "true";
    edit_id = "";
  } else {
    adding = "false";
    edit_id = $(".edit-id").val();
  }
  $.ajax({
    type: "GET",
    url: "/add_task/",
    data: {
      title: title,
      des: des,
      priority: priority,
      date: date1,
      time: time1,
      status: status,
      adding: adding,
      edit_id: edit_id,
    },
    success: function (response) {
      var x = $(".pop-up");
      x.addClass("hide");
      $("html").css("overflow", "auto");
      if (adding == "true") {
        alert("Task added to list successfully");
        var x = $(".task");
        var task = $(".task.hide").clone();
        task.removeClass("hide");
        task.attr("data-id", response.id);
        task.find(".number h1").text(response.id);
        task.find(".title h1").text(title + ", " + des);
        task.find(".priority h1").text(priority);
        task.find(".date h1").text(date1);
        task.find(".time h1").text(time1);
        task.find(".status h1").text(status);
        task.find(".edit img").attr("data-id", response.id);
        task.find(".delete img").attr("data-id", response.id);
        $(".tasks").append(task);
      } else {
        alert("Task saved to list successfully");
      }

      location.reload();
    },
  });
});
