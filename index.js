const questions = [
    {
        question: 'Name a mythical creature with single large, pointed, spiraling horn projecting from its forehead.',
        answers: ['Dragon', 'Unicorn', 'Cat']
    },
    {
        question: 'Name startup company valued at over $1 billion',
        answers: ['Dumpster', 'Unicorn', 'Alice']
    },
    {
        question: 'When thirsty what should you drink?',
        answers: ['Vodka', 'Water', 'Gasoline']
    },
    {
        question: 'When taking your employees out, you buy them:',
        answers: ['a pop (or a soda I guess)', 'pizza', 'SHOTS, SHOTS, SHOTS']
    },
    {
        question: 'When meeting with the Indian Government, don\'t forget to wear....',
        answers: ['A T-shirt with lips all over it', 'Comfy shoes', 'A unicorn mask']
    },
    {
        question: 'What is the best part about working at Pivotal?',
        answers: ['Hearing the condescending tech interviews!',
            'Getting hit by ping pong balls.',
            'Making your mimosas out of non-sparkling wine...']
    },
    {
        question: 'To have a successful office, you need...',
        answers: ['Pizza for breakfast', '$100 snacks', 'Quiet']
    },
    {
        question: 'What is the best way to get to work?',
        answers:['Train', 'Bus', 'Jillian driving the Alice Mobile!']
    },
    {
        question: 'When it starts pouring rain on your founders walk, you…',
        answers:['Cancel. Everything is ruined. ', 'Keep going! Then go buy new clothes at Burlington Coat Factory.', 'Move back to Texas']
    },

    {
        question: 'You’re in DC and all of the Federal Buildings are closed because…',
        answers: ['There’s a slight breeze coming across the Potomac',  'International Conspiracy', 'All of the Above']
    },
    {
        question: 'You’re in DC and all of the Federal Buildings are closed because…',
        answers: ['There’s a slight breeze coming across the Potomac',  'International Conspiracy', 'All of the Above']
    }
]

const answers = ['b', 'b', 'b', 'c', 'a', 'a', 'b', 'c', 'b', 'c']


document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('.question').innerHTML = questions[0].question;
    let step = 0;
    let unicorns = 0;
    let poops = 0;

    function nextQuestion(e) {


        console.log('Step', step);
        e.preventDefault()

        if(this.dataset.answer === answers[step]){
            unicorns++;
            document.querySelector('.unicorn span').innerHTML = unicorns;
        }
        else {
            poops++;
            document.querySelector('.poop span').innerHTML = poops;
        }

        step += 1;
        document.querySelector('.question').innerHTML = questions[step].question;
        document.querySelectorAll('label span')[0].innerHTML = questions[step].answers[0];
        document.querySelectorAll('label span')[1].innerHTML = questions[step].answers[1];
        document.querySelectorAll('label span')[2].innerHTML = questions[step].answers[2];


        if( step >= 10 ) {
            if(unicorns === 10 ) {
                setInterval(function () {
                    cornify_add();
                }, 500);
            }else {
                document.querySelector('button').style.display = 'block';
            }
        }
    }

    const labels = document.querySelectorAll('.buttons label');
    labels.forEach(panel => panel.addEventListener('click', nextQuestion));
});






