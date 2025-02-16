document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("check").addEventListener("click", async () => {
        let site = document.getElementById("website").value.trim();
        let loadingText = document.querySelector(".loading");
        let resultText = document.getElementById("result");

        if (!site) return alert("Please enter a website!");

        loadingText.style.display = "block";
        resultText.innerHTML = "";

        try {
            let response = await fetch(`http://localhost:3000/api/rank?url=${site}`);

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            let data = await response.json();
            loadingText.style.display = "none";

            if (data.status === false) {
                resultText.innerHTML = `⚠️ Error: ${data.error}`;
            } else if (data.response?.length > 0) {
                let rank = data.response[0].page_rank_decimal ?? "N/A";
                resultText.innerHTML = `<b>${site}</b> has a PageRank of: <b>${rank}</b>`;
            } else {
                resultText.innerHTML = "⚠️ No data found for this website.";
            }
        } catch (error) {
            loadingText.style.display = "none";
            resultText.innerHTML = "⚠️ Error fetching data.";
            console.error("Fetch Error:", error);
        }
    });
});
