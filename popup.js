console.log('Popup is loaded');

var selectElement = document.getElementById("providers");

console.log(selectElement);

selectElement.addEventListener('change', function() {
    // Get the selected option
    const selectedOption = selectElement.options[selectElement.selectedIndex];
  
    // Get the value of the selected option
    const selectedValue = selectedOption.value;
  
    // Log the value to the console
    console.log('Selected value:', selectedValue);

    chrome.storage.sync.set({ selectedProvider: selectedValue }, function() {
        console.log('Data saved:', selectedValue);
    });

    // close popup
    window.close();
});

chrome.storage.sync.get(['selectedProvider'], function(result) {
    console.log("User seleced provider: ", result);
    if (result.selectedProvider) {
        // set selected option in selectElement
        selectElement.value = result.selectedProvider
    };
});