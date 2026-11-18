import asyncio

from mcp import ClientSession
from mcp.client.stdio import stdio_client
from mcp.client.stdio import StdioServerParameters


async def main():

    server = StdioServerParameters(

        command="python",

        args=[
            "-m",
            "rag_agent.server",
        ],

    )

    async with stdio_client(server) as (read, write):

        async with ClientSession(read, write) as session:

            await session.initialize()

            print("=" * 60)
            print("INDEXATION")
            print("=" * 60)

            result = await session.call_tool(

                "index_document_tool",

                {
                    "document_id": 5,
                },

            )

            print(result)

            print()

            print("=" * 60)
            print("QUESTION")
            print("=" * 60)

            result = await session.call_tool(

                "ask_question_tool",

                {
                    "question": "Quel est le sujet principal de ce document ?",
                    "top_k": 5,
                },

            )

            print(result)


if __name__ == "__main__":

    asyncio.run(main())