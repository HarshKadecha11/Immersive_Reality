import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupabaseSetup from "@/components/SupabaseSetup";
import { isSupabaseConfigured } from "@/lib/supabase";

const SupabaseSetupPage = () => {
  const navigate = useNavigate();

  const handleSetupComplete = () => {
    // Redirect to home page after setup is complete
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Supabase Configuration
          </h1>

          <div className="mb-8">
            <p className="text-center text-muted-foreground mb-8">
              Connect your EstateVista application to Supabase to enable
              authentication, database, and storage features.
            </p>

            <SupabaseSetup onComplete={handleSetupComplete} />
          </div>

          {!isSupabaseConfigured() && (
            <div className="mt-12 space-y-6">
              <h2 className="text-xl font-semibold">
                How to get your Supabase credentials
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    1. Create a Supabase project
                  </h3>
                  <p className="text-muted-foreground">
                    Go to{" "}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      supabase.com
                    </a>{" "}
                    and sign up or log in. Then create a new project.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    2. Get your project URL
                  </h3>
                  <p className="text-muted-foreground">
                    In your Supabase project dashboard, go to Project Settings →
                    API. Copy the URL under "Project URL".
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">3. Get your Anon Key</h3>
                  <p className="text-muted-foreground">
                    In the same API section, copy the key under "anon" or
                    "public".
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    4. Enter the credentials above
                  </h3>
                  <p className="text-muted-foreground">
                    Paste your Project URL and Anon Key into the fields above
                    and click "Connect to Supabase".
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SupabaseSetupPage;
