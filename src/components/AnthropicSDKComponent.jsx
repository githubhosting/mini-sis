import React, { useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const AnthropicSDKComponent = () => {
  useEffect(() => {
    async function main() {
      const anthropic = new Anthropic({
        apiKey: 'my api key', // Replace 'my api key' with your actual API key
      });

      try {
        const completion = await anthropic.completions.create({
          model: 'claude-2',
          max_tokens_to_sample: 300,
          prompt: `${Anthropic.HUMAN_PROMPT} how does a court case get to the Supreme Court? ${Anthropic.AI_PROMPT}`,
        });
        console.log('Completion Result:', completion);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    main();
  }, []);

  return <div>Anthropic SDK Component</div>;
};

export default AnthropicSDKComponent;
