window.onload = function() {
        var quotes = [
          "The only way to do great work is to love what you do. - Steve Jobs",
          "Innovation distinguishes between a leader and a follower. - Steve Jobs",
          "Stay hungry, stay foolish. - Steve Jobs"
        ];

        function newQuote() {
          var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          document.getElementById("quote").innerHTML = randomQuote;
        }

        newQuote(); // Call the function to display a quote when the page loads
      }
