
  $(document).ready(function () {
  const words = ['computer', 'hangman', 'coffee', 'laptop', 'coding', 'cave', 'runes', 'ruins'];
    const totalLives = 10;

  let selectedWord, guessed, wrongLetters, lives;

  function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessed = [];
    wrongLetters = [];
    lives = totalLives;

    $('#letters').empty();
    $('#wordDisplay').empty();
    $('#wrongLetters').empty();
    $('#livesCount').text(lives);

    createButtons();
    displayWord();

    $(document).on('keydown', keyHandler);
  }

  function createButtons() {
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      $('#letters').append(
        `<button class="letter-btn" data-letter="${letter}">${letter}</button>`
      );
    }

    $('.letter-btn').click(function () {
      const letter = $(this).data('letter');
      handleGuess(letter);
    });
  }

  function handleGuess(letter) {
    if (!/^[a-z]$/.test(letter)) return;
    if (guessed.includes(letter) || wrongLetters.includes(letter)) return;

    $(`.letter-btn[data-letter="${letter}"]`).prop('disabled', true);

    if (selectedWord.includes(letter)) {
      guessed.push(letter);
    } else {
      wrongLetters.push(letter);
      lives--;
      $('#wrongLetters').text(wrongLetters.join(', '));
      $('#livesCount').text(lives);
    }

    displayWord();
    checkGameStatus();
  }

  function displayWord() {
    const display = selectedWord
      .split('')
      .map(l => (guessed.includes(l) ? l : '_'))
      .join(' ');
    $('#wordDisplay').text(display);
  }

  function showMessage(text, color, win) {
    $('#modalMessage').text(text).css('color', color);
    
    if (win) {
      $('#modalNextBtn').show();    // Show Next button if won
    } else {
      $('#modalNextBtn').hide();    // Hide Next button if lost
    }
  
    $('#resultModal').fadeIn();
  }
  

  function checkGameStatus() {
    if (!$('#wordDisplay').text().includes('_')) {
      showMessage('🎉 You win!', '#36ff33', true);
      endGame();
    } else if (lives <= 0) {
      showMessage(`💀 You lose! The word was "${selectedWord}"`, 'red', false);
      endGame();
    }
  }

  function endGame() {
    $('.letter-btn').prop('disabled', true);
    $(document).off('keydown', keyHandler);
  }

  function keyHandler(e) {
    handleGuess(e.key);
  }

  // "Next" button handler
$('#modalNextBtn').click(function () {
  $('#resultModal').fadeOut();
  startGame();
});


  $('#closeModal').click(() => $('#resultModal').fadeOut());
  $('#modalRestartBtn').click(() => {
    $('#resultModal').fadeOut();
    startGame();
  });

  startGame();
});
