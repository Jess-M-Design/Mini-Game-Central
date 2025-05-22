$(document).ready(function () {
  let user = {
    char_name: "Our Hero",
    hp: 100,
    attack: 20,
    coins: 5,
    sprite: "https://i.redd.it/ob52245zficy.gif"
  };

  let boss = {
    char_name: "Evil Wizard",
    hp: 200,
    attack: 8,
    sprite: "images/evil-wizard3.gif"
  };

  let isPlayerTurn = true;

  // DOM elements
  const $bossHP = $("#boss-hp");
  const $userHP = $("#user-hp");
  const $userPotions = $("#user-potions");
  const $userImg = $("#user-img");
  const $bossImg = $("#boss-img");
  const $userName = $("#char-name");
  const $turnIndicator = $("#turn-indicator");

  function setTurnIndicator() {
    if (isPlayerTurn) {
      $turnIndicator.text("🟢 Your Turn!");
    } else {
      $turnIndicator.text("🧠 Boss is thinking...");
    }
  }

  function renderGame() {
    $bossHP.text(boss.hp);
    $userHP.text(user.hp);
    $userPotions.text(user.coins);
    $userImg.attr("src", user.sprite);
    $bossImg.attr("src", boss.sprite);
    $userName.text(user.char_name);
    updateHPBars();
    setTurnIndicator(); // Always show current turn
  }

  function showResult(message, won) {
    const modal = new bootstrap.Modal(document.getElementById('game-modal'));
    const modalBody = document.querySelector("#game-modal .modal-body");
    const nextBtn = document.getElementById("next-game-btn");
    const tryAgainBtn = document.getElementById("try-again-btn");
  
    modalBody.textContent = message;
  
    // Toggle visibility of buttons
    if (won) {
      nextBtn.style.display = "inline-block";
      tryAgainBtn.style.display = "none";
    } else {
      nextBtn.style.display = "none";
      tryAgainBtn.style.display = "inline-block";
    }
  
    modal.show();
  
    // Disable game buttons
    setButtonsEnabled(false);
  }
  
  // Reset game when "Try Again" is clicked
  document.getElementById("try-again-btn").addEventListener("click", function () {
    restartGame();
  });
  

  function restartGame() {
    user.hp = 100;
    user.coins = 5;
    boss.hp = 200;
    isPlayerTurn = true;
  
    setButtonsEnabled(true);
    renderGame();
  }
  

// Event listeners for modal interactions
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close-button");
  const modalNextBtn = document.getElementById("modalNextBtn");

  // Close modal when clicking the close button
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Restart game when clicking the "Play Again" button
  modalNextBtn.addEventListener("click", restartGame);
});

  

  function restartGame() {
    // Reset all key values
    user.hp = 100;
    user.coins = 5;
    boss.hp = 200;
    isPlayerTurn = true;
  
    // Hide modal first
    $("#resultModal").hide();
  
    // Enable buttons and show correct turn
    setButtonsEnabled(true);
    renderGame();
  }
  

  function updateHPBars() {
    const userPercent = Math.max(0, (user.hp / 100) * 100);
    const bossPercent = Math.max(0, (boss.hp / 200) * 100);

    $("#user-hp-bar").css({
      width: userPercent + "%",
      backgroundColor: getHPColor(userPercent)
    });

    $("#boss-hp-bar").css({
      width: bossPercent + "%",
      backgroundColor: getHPColor(bossPercent)
    });
  }

  function getHPColor(percent) {
    if (percent > 60) return "#00cc00"; // green
    if (percent > 30) return "#ffcc00"; // yellow
    return "#cc0000"; // red
  }

  function bossAttack() {
    if (user.hp <= 0) return;
    user.hp -= boss.attack;
    renderGame();

    if (user.hp <= 0) {
      setTimeout(() => showResult("You lost!", false), 500);
    }
  }

  function setButtonsEnabled(enabled) {
    $("#attack, #potion, #special").prop("disabled", !enabled);
  }

  $("#attack").click(function () {
    if (!isPlayerTurn) return;

    boss.hp -= user.attack;
    isPlayerTurn = false;
    renderGame();
    setButtonsEnabled(false);

    if (boss.hp <= 0) {
      setTimeout(() => showResult("You win!", true), 800);
    } else {
      setTimeout(() => {
        bossAttack();
        isPlayerTurn = true;
        setButtonsEnabled(true);
        renderGame();
      }, 1200);
    }
  });

  $("#potion").click(function () {
    if (!isPlayerTurn || user.coins <= 0) return;

    user.hp = Math.min(100, user.hp + 20);
    user.coins -= 1;
    isPlayerTurn = false;
    renderGame();
    setButtonsEnabled(false);

    setTimeout(() => {
      bossAttack();
      isPlayerTurn = true;
      setButtonsEnabled(true);
      renderGame();
    }, 1200);
  });

  $("#special").click(function () {
    if (!isPlayerTurn) return;

    boss.hp -= user.attack * 2;
    user.hp -= 10;
    isPlayerTurn = false;
    renderGame();
    setButtonsEnabled(false);

    if (boss.hp <= 0) {
      setTimeout(() => showResult("You win with a special move!", true), 800);
    } else {
      setTimeout(() => {
        bossAttack();
        isPlayerTurn = true;
        setButtonsEnabled(true);
        renderGame();
      }, 1200);
    }
  });

  $("#modalNextBtn").click(function () {
    $("#resultModal").fadeOut(300, restartGame);
  });

  // Ensure modal is hidden on first load
  $("#resultModal").hide();

  // Initialize game
  renderGame();

});
