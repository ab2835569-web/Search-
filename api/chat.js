export default async function handler(req, res) {
    // শুধুমাত্র POST রিকোয়েস্ট অ্যালাউ করা হচ্ছে
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const { message } = req.body;  

    // আপনার আসল এপিআই কী এখানে বসানো হয়েছে
    const API_KEY = "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"; 

    try {  
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {  
            method: "POST",  
            headers: {  
                "Authorization": `Bearer ${API_KEY}`,  
                "Content-Type": "application/json"  
            },  
            body: JSON.stringify({  
                model: "llama-3.1-8b-instant",  
                messages: [{ role: "user", content: message }],  
                temperature: 0.7  
            })  
        });  

        const data = await response.json();  

        // এপিআই থেকে আসা ডাটা চেক করা
        const reply = data.choices?.[0]?.message?.content || "No response from AI";  

        // ফ্রন্টএন্ডে উত্তর পাঠানো
        res.status(200).json({ reply });  

    } catch (error) {  
        console.error("API Error:", error);
        res.status(500).json({ error: "Server error occurred while fetching data" });  
    }
              }
