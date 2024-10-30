      // Create a div to represent the blue square


      // Update the position of the div based on mouse movement
      document.body.addEventListener('mousemove', (e) => {
          // Set the position of the div to follow the mouse cursor
          const div = document.createElement('div');
          document.body.appendChild(div);
          document.body.style.padding = '0'
          document.body.style.margin = '0'
          document.body.style.overflow = 'none'
          document.body.style.cursor = 'none'
          // Style the square directly using JavaScript
          div.style.background = 'blue';
          div.style.height = '100px';
          div.style.width = '100px';
          div.style.padding = '0'
          div.style.borderRadius = '100%'
          div.style.margin = '0'
          div.style.bottom = '0'
          
          div.style.position = 'absolute';  // Position the square absolutely
          div.style.pointerEvents = 'none'; // Allow mouse events to pass through
          div.style.transform = 'translate(-50%, -50%)'; // Center on cursor
          div.style.top = `${e.clientY}px`;
          div.style.left = `${e.clientX}px`;
          div.style.bottom = `${e.clientY}px`
          console.log(e.clientX)
          div.style.background = `rgb(${e.clientX}, ${e.clientY}, ${e.clientX})`
          
      });