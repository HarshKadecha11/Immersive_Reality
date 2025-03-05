import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Trash } from "lucide-react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import UserProfileForm from "@/components/UserProfileForm";
import DeleteAccountDialog from "@/components/DeleteAccountDialog";
import SavedPropertiesList from "@/components/SavedPropertiesList";
import PropertyVisitsList from "@/components/PropertyVisitsList";
import AgentContactsList from "@/components/AgentContactsList";

const ProfilePage = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <ProfilePictureUpload size="lg" />
                </div>
                <h2 className="text-xl font-semibold">User</h2>
                <p className="text-muted-foreground">user@example.com</p>

                <div className="w-full mt-6 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="saved">Saved Properties</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Personal Information
                    </h2>
                    <UserProfileForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties">
                <Tabs defaultValue="visits">
                  <TabsList className="mb-4">
                    <TabsTrigger value="visits">Property Visits</TabsTrigger>
                    <TabsTrigger value="agents">
                      Agent Communications
                    </TabsTrigger>
                    <TabsTrigger value="listings">My Listings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="visits">
                    <Card>
                      <CardContent className="p-6">
                        <PropertyVisitsList />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="agents">
                    <Card>
                      <CardContent className="p-6">
                        <AgentContactsList />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="listings">
                    <Card>
                      <CardContent className="text-center py-12">
                        <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No Properties Listed
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          You haven't listed any properties yet.
                        </p>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Post a Property
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="saved">
                <Card>
                  <CardContent className="p-6">
                    <SavedPropertiesList />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <DeleteAccountDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />

      <Footer />
    </div>
  );
};

export default ProfilePage;
