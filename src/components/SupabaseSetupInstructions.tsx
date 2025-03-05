import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const SupabaseSetupInstructions = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-green-600">
          Supabase API Key Setup Instructions
        </CardTitle>
        <CardDescription>
          Follow these steps to properly set up your Supabase API keys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">1. Create a Supabase Project</h3>
          <p className="text-muted-foreground">
            Go to{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              supabase.com
            </a>{" "}
            and sign up or log in. Then create a new project.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">2. Get your API credentials</h3>
          <p className="text-muted-foreground">
            In your Supabase project dashboard, go to Project Settings → API.
            You'll need to copy two values:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>The URL under "Project URL"</li>
            <li>The API key under "anon" or "public"</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            3. Update your environment variables
          </h3>
          <p className="text-muted-foreground">
            Create or edit the{" "}
            <code className="bg-muted px-1 py-0.5 rounded">.env</code> file in
            your project root and add:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            VITE_SUPABASE_URL=https://your-project-url.supabase.co
            <br />
            VITE_SUPABASE_ANON_KEY=your-anon-key
          </pre>
          <p className="text-muted-foreground">
            Replace the values with your actual Supabase URL and anon key.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            4. Restart your development server
          </h3>
          <p className="text-muted-foreground">
            After updating the environment variables, restart your development
            server for the changes to take effect.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <h3 className="text-lg font-medium text-green-700 mb-2">
            Temporary Solution
          </h3>
          <p className="text-green-600 mb-2">
            For now, we've implemented a fallback mechanism that allows the app
            to function without proper API keys. This is only for development
            purposes and should be replaced with your actual Supabase
            credentials.
          </p>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => (window.location.href = "/supabase-setup")}
          >
            Go to Supabase Setup Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseSetupInstructions;
