const main = () => {
    // All buttons
    const puzzel1 = document.getElementById("js--puzzel-1");
    const puzzel2 = document.getElementById("js--puzzel-2");
    const puzzel3 = document.getElementById("js--puzzel-3");
    const puzzel4 = document.getElementById("js--puzzel-4");
    const puzzel5 = document.getElementById("js--puzzel-5");
    const puzzel6 = document.getElementById("js--puzzel-6");
    const puzzel7 = document.getElementById("js--puzzel-7");
    const puzzel8 = document.getElementById("js--puzzel-8");

    const resetButton = document.getElementById("js--reset");

    // API
    const api_base_url = "https://ipmedt3-5d5a0-default-rtdb.europe-west1.firebasedatabase.app/";
    const api_args = "game/";
    let api_type = "";

    let reset_value = {
        image1: {
            solved: false,
        },
        image2: {
            solved: false,
        },
        image3: {
            solved: false,
        },
        image4: {
            solved: false,
        },
        txt1: {
            solved: false,
        },
        txt2: {
            solved: false,
        },
        txt3: {
            solved: false,
        },
        txt4: {
            solved: false,
        },
    }; // default value to reset database after demo
    let value = null; // true or false to check if puzzle is solved

    // All buttons in list
    buttons = [puzzel1, puzzel2, puzzel3, puzzel4, puzzel5, puzzel6, puzzel7, puzzel8];

    // onclick Event listeners for all buttons
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Styles
            button.style.backgroundColor = "grey";
            button.innerHTML = "Puzzel opgelost!";
            button.style.cursor = "not-allowed";
            button.style.color = "#e0e0e0";

            // API call
            api_type = button.dataset.type;

            // sets to true the solved value in the database
            value = {
                solved: true,
            };

            // check if solved is not null & send to firebase
            if (!(value == null)) {
                // write data
                fetch(api_base_url + api_args + api_type + ".json", {
                    method: "PUT",
                    body: JSON.stringify(value),
                }).catch((error) => {
                    console.error("Error:", error);
                });
            } else {
                console.log("Warning: post is null");
            }
        });
    });

    // reset database onclick
    resetButton.addEventListener("click", () => {
        // styles
        resetButton.style.backgroundColor = "grey";
        resetButton.innerHTML = "Reset!";
        setTimeout(() => {
            resetButton.innerHTML = "Reset to Default";
            resetButton.style.backgroundColor = "rgb(197, 0, 0)";
        }, 1000);
        resetButton.style.cursor = "not-allowed";
        // API call - send default database values
        fetch(api_base_url + api_args + ".json", {
            method: "PUT",
            body: JSON.stringify(reset_value),
        }).catch((error) => {
            console.error("Error:", error);
        });
    });
};

window.onload = () => {
    main();
};
