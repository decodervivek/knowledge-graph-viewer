import openai
import json
import jsonify

# Set your OpenAI API key
client = openai.OpenAI(api_key="sk-...")

def create_knowledge_graph(unstructured_text):
    try:
        messages = [
            {
                "role": "system",
                "content": """
                You are an AI expert in knowledge graph creation. Your task is to analyze the given text and create a flexible, structured knowledge graph.
                - Identify relevant entities and their types based on the content.
                - Identify meaningful relationships between these entities.
                - Focus on extracting the most important and relevant information.
                - Be adaptable to various topics and domains.
                - Ensure each entity has at least one relationship with another entity.
                """
            },
            {
                "role": "user",
                "content": f"Create a knowledge graph from the following text: {unstructured_text}"
            }
        ]

        function_schema = {
            "name": "flexible_knowledge_graph",
            "description": "Generate a flexible knowledge graph with entities and relationships.",
            "parameters": {
                "type": "object",
                "properties": {
                    "nodes": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {"type": "string"},
                                "name": {"type": "string"},
                                "type": {"type": "string"}
                            },
                            "required": ["id", "name", "type"]
                        }
                    },
                    "relationships": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "from": {"type": "string"},
                                "to": {"type": "string"},
                                "type": {"type": "string"},
                                "description": {"type": "string"}
                            },
                            "required": ["from", "to", "type", "description"]
                        }
                    }
                },
                "required": ["nodes", "relationships"]
            }
        }

        completion = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=messages,
            functions=[function_schema],
            function_call={"name": "flexible_knowledge_graph"}
        )

        function_call = completion.choices[0].message.function_call
        if function_call and function_call.name == "flexible_knowledge_graph":
            response_data = json.loads(function_call.arguments)
            return response_data
        else:
            print("Unexpected response format")
            return None

    except Exception as e:
        print(f"Error during flexible knowledge graph creation: {e}")
        return None

# Example usage
unstructured_text = """
Climate change is a global issue affecting various aspects of our planet. Rising temperatures are causing polar ice caps to melt, leading to sea level rise. This threatens coastal cities like Miami and Venice. Extreme weather events, such as hurricanes and droughts, are becoming more frequent and severe. Scientists like Dr. James Hansen have been warning about these effects for decades. Governments and organizations, including the United Nations, are working on policies to reduce greenhouse gas emissions. Companies like Tesla are developing electric vehicles to decrease reliance on fossil fuels.
"""

knowledge_graph = create_knowledge_graph(unstructured_text)

if knowledge_graph:
    print(json.dumps(knowledge_graph, indent=2))
else:
    print("Failed to create knowledge graph.")


def natural_input(data):

    try :
        unstructured_text = data.get("unstructured_text")
        if not unstructured_text :
            return jsonify({"error": "No natural input provided"}), 400
        
        knowledge_graph_data = create_knowledge_graph(unstructured_text)

        if not knowledge_graph_data:
            return jsonify({"error": "Failed to create knowledge graph"}), 500  
        
        # add the knowledge graph data to your database

    except Exception as e:
        return jsonify({"error": str(e)}), 500

