const socket = io('http://localhost:3000')
let index = 0;
$('#todolistForm').submit(function (e) {
    e.preventDefault(); //loại bỏ hành động submit của form
    const task = $('#task').val();
    socket.emit('addTask', task);
    insertTask(task, index);
    index++;
    $('#task').val('').focus();
    return false;
});

socket.on('updateTask', function(todolist) {
    // khi 1 client connect vào server, nó sẽ nghe được sự kiện updateTask phát ra từ server, sự kiện này giúp
    // mọi client đều update chung nội dung từ server gửi đến
    $('#todolist').empty(); // xóa hết nội dung cũ của #todolst , sau đó chèn mới vào
    todolist.forEach(function(task, index) {
        insertTask(task, index);
    });
});

socket.on('addTask', function(data) {
    insertTask(data.task, data.index);
});

function insertTask(task, index) {
    $('#todolist').append('<li><a class="delete" href="#" data-index="' + index + '">✘</a> ' + task  + '</li>');
}