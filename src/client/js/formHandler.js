import { json } from "body-parser";

async function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('text').value;
    let errorMessage = document.querySelector('.text-info');
    let formResults = document.querySelector('#results');
    
    await Client.getAnalysis(formText);

    if (formText === '') {
        errorMessage.classList.remove('hidden');
        formResults.classList.add('hidden');
    } else {
        if(!errorMessage.classList.contains('hidden')) {
            errorMessage.classList.add('hidden');
            formResults.classList.remove('hidden');
        } 
        fetch('http://localhost:8081/getmydata')
        .then(res => res.json())
        .then(function(data) {
            document.getElementById('results').innerHTML = 
            `   <div><p>Agreement: ${data.agreement}</br>
                Irony: ${data.irony}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</p></div>
            `
        })
        .catch(err => {
            console.error(err);
        })
    }
    
}

export { handleSubmit }
