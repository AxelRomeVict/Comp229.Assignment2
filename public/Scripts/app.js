// IIfe -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App started...")
    }
    let deleteButtons = document.querySelectorAll('.btn-danger')

    for(button of deleteButtons)
    {
        button.addEvenListener('click', (event)=> {
            if(!confirm ("Are you sure?"))
            {
                event.preventDefault();
                window.location.assign('/book-list');
                
            }
        });
    }

    window.addEventListener("load", Start);

})();