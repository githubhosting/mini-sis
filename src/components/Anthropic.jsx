/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import LoadingText from "./Loading1";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey:
    "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",
});

function AnthropicComponent(props) {
  const mydata = props.data;
  const [aiResponse, setAiResponse] = useState(null);
  const [responseLoading, setResponseLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rerror, setRerror] = useState(null);

  useEffect(() => {
    const main = async () => {
      const url = "https://api.anthropic.com/v1/complete";
      const proxyUrl = "https://cors-anywhere.herokuapp.com/" + url;
      const filteredData = {
        name: mydata.name,
        usn: mydata.usn,
        marks: mydata.marks,
      };
      const stringdata = JSON.stringify(filteredData);
      const preprompt = "Please find below the essential student data:";
      const postprompt =
        "Your meticulous data analysis will be instrumental in extracting and presenting the key points.";
      const fullprompt = `${preprompt} ${stringdata} ${postprompt}`;
      // const fullprompt = "This just an test";
      const params = {
        prompt: `${Anthropic.HUMAN_PROMPT} ${fullprompt} ${Anthropic.AI_PROMPT}`,
        max_tokens_to_sample: 500,
        model: "claude-2",
      };

      try {
        setResponseLoading(true);
        setError(null);

        const response = await fetch(proxyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropic.apiKey,
          },
          body: JSON.stringify(params),
        });

        const results = await response.json();
        setAiResponse(results.completion);
        console.log(results);
        setRerror(results.error.message);
      } catch (error) {
        console.error("Anthropic API call failed:", error);
        setError("Failed to fetch AI response.");
        setRerror(null);
      } finally {
        setResponseLoading(false);
      }
    };
    main();
  }, [mydata]);

  return (
    <div>
      <div className="border-t border-gray-200 mt-6"></div>
      <div className="mt-6">
        <div className="mt-6">
          {responseLoading ? (
            <>
              <h1 className="text-center">
                Analyzing your data with AI magic. Hold on tight!
              </h1>
              <LoadingText />
            </>
          ) : (
            <div className="px-4">
              {rerror && <div className="px-4 break-words">{rerror}</div>}
              Here is analysis by AI:
              {aiResponse && <div className="break-words">{aiResponse}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnthropicComponent;
