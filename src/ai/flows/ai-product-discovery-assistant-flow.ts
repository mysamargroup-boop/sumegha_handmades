'use server';
/**
 * @fileOverview An AI product discovery assistant that suggests handmade products based on user queries.
 *
 * - aiProductDiscoveryAssistant - A function that handles product suggestions.
 * - ProductDiscoveryInput - The input type for the aiProductDiscoveryAssistant function.
 * - ProductDiscoveryOutput - The return type for the aiProductDiscoveryAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductDiscoveryInputSchema = z.object({
  userQuery: z
    .string()
    .describe(
      'A description of user preferences or occasions for product suggestions (e.g., "a unique gift for my sister who loves pottery and nature" or "wall art that fits a bohemian living room").'
    ),
});
export type ProductDiscoveryInput = z.infer<typeof ProductDiscoveryInputSchema>;

const ProductSchema = z.object({
  productId: z.string().describe('A unique identifier for the suggested product.'),
  name: z.string().describe('The name of the suggested product.'),
  description: z.string().describe('A detailed description of the product, highlighting its handmade quality and relevance to the query.'),
  price: z.number().describe('The estimated price of the product (e.g., 29.99, 50.00).'),
  imageUrl: z.string().url().describe('A placeholder URL for an image of the product.'),
  categories: z.array(z.string()).describe('List of categories this product belongs to.'),
});

const ProductDiscoveryOutputSchema = z.object({
  assistantResponse: z.string().describe('A friendly and helpful response from the AI assistant.'),
  suggestedProducts: z.array(ProductSchema).describe('A list of handmade products suggested by the AI based on the user query.'),
});
export type ProductDiscoveryOutput = z.infer<typeof ProductDiscoveryOutputSchema>;

export async function aiProductDiscoveryAssistant(input: ProductDiscoveryInput): Promise<ProductDiscoveryOutput> {
  return aiProductDiscoveryAssistantFlow(input);
}

const productDiscoveryPrompt = ai.definePrompt({
  name: 'productDiscoveryPrompt',
  input: { schema: ProductDiscoveryInputSchema },
  output: { schema: ProductDiscoveryOutputSchema },
  prompt: `You are an AI product discovery assistant for "Sumegha Handmades", a business specializing in unique handmade art products.
Your goal is to understand the user's preferences and occasions, and then suggest relevant handmade products that fit their description.
For each suggestion, provide a product name, a detailed description highlighting its handmade quality and relevance, an estimated price, a placeholder image URL, and relevant categories.
Ensure the image URL is a valid placeholder.
If you cannot find suitable products, still provide a helpful response and explain why, returning an empty array for suggestedProducts.

User's preferences/occasion: "{{{userQuery}}}"

Please provide your response in JSON format according to the following schema:
{{jsonSchema output.schema}}`,
});

const aiProductDiscoveryAssistantFlow = ai.defineFlow(
  {
    name: 'aiProductDiscoveryAssistantFlow',
    inputSchema: ProductDiscoveryInputSchema,
    outputSchema: ProductDiscoveryOutputSchema,
  },
  async (input) => {
    const { output } = await productDiscoveryPrompt(input);
    return output!;
  }
);
