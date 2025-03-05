import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface SupabaseSetupProps {
  onComplete?: () => void;
}

const SupabaseSetup = ({ onComplete }: SupabaseSetupProps) => {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if Supabase is already configured
    if (isSupabaseConfigured()) {
      setIsConfigured(true);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  const handleSaveConfig = async () => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // In a real app, we would save these to environment variables
      // For this demo, we'll just simulate a successful configuration
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Please provide both Supabase URL and Anon Key");
      }

      if (!supabaseUrl.includes("supabase.co")) {
        throw new Error("Invalid Supabase URL format");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, we would update the environment variables here
      // For now, we'll just show a success message
      setSuccess(true);
      setIsConfigured(true);

      // Reload the page to apply the new configuration
      // In a real app, we would update the Supabase client
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to save configuration");
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfigured) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Supabase Connected
          </CardTitle>
          <CardDescription>
            Your application is successfully connected to Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You can now use authentication, database, and other Supabase
            features in your application.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect to Supabase</CardTitle>
        <CardDescription>
          Enter your Supabase project credentials to connect your application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supabase-url">Supabase URL</Label>
          <Input
            id="supabase-url"
            placeholder="https://your-project-id.supabase.co"
            value={supabaseUrl}
            onChange={(e) => setSupabaseUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Find this in your Supabase project settings under API
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="supabase-key">Supabase Anon Key</Label>
          <Input
            id="supabase-key"
            placeholder="your-anon-key"
            value={supabaseKey}
            onChange={(e) => setSupabaseKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Find this in your Supabase project settings under API
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-500 p-3 rounded-md flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Supabase configuration saved successfully!
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSaveConfig}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect to Supabase"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseSetup;
