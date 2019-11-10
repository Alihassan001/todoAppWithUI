addTodo = ()=>{
    let add_data= `<div class="" id="wrapper">
    <div id="mainAreaForm">
        
        <form action="post">
                <p>Add Todo</p>
            <input type="text" placeholder="Title" id="title">
            <textarea name="" id="txtArea"  placeholder="Description"></textarea>
            <select name="" id="type"> Select Type
                <option value="WK">Work</option>
                <option value="AG">Assignment</option>
                <option value="OT">Other</option>
            </select>
            <select name="" id="status"> Select Status
                <option value="open">Open</option>
                <option value="inprogress">InProgress</option>
                <option value="done">Done</option>
            </select>
            <a href="javascript:void(0)" onclick="userData();">Added</a>
        </form>
    </div>
    <div id="sideBar">
        <a href="Javascript:void(0)" onclick="closeTab()">X</a>
    </div>
</div>`
    document.querySelector('#wrapperMain').innerHTML += add_data;
    
}