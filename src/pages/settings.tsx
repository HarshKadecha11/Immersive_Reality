import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Shield, Loader2 } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    propertyUpdates: true,
    marketingEmails: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      // In a real app, this would update the password in Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showNotification("Password updated successfully!", "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error updating password:", error);
      showNotification(error.message || "Failed to update password", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would update notification preferences in Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showNotification("Notification preferences updated!", "success");
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      showNotification("Failed to update notification preferences", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-xl font-semibold">
                  {user?.user_metadata?.name || "User"}
                </h2>
                <p className="text-muted-foreground">{user?.email}</p>

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
                    <User className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() =>
                      showNotification("This feature is coming soon!", "info")
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="security">
              <TabsList className="mb-6">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              placeholder="Enter your current password"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              placeholder="Enter your new password"
                              className="pl-10"
                              required
                              minLength={8}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters long
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              placeholder="Confirm your new password"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleNotificationSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailAlerts" className="text-base">
                              Email Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive property alerts via email
                            </p>
                          </div>
                          <Switch
                            id="emailAlerts"
                            checked={notifications.emailAlerts}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("emailAlerts", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="smsAlerts" className="text-base">
                              SMS Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive property alerts via SMS
                            </p>
                          </div>
                          <Switch
                            id="smsAlerts"
                            checked={notifications.smsAlerts}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("smsAlerts", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="propertyUpdates"
                              className="text-base"
                            >
                              Property Updates
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Get updates about saved properties
                            </p>
                          </div>
                          <Switch
                            id="propertyUpdates"
                            checked={notifications.propertyUpdates}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "propertyUpdates",
                                checked,
                              )
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="marketingEmails"
                              className="text-base"
                            >
                              Marketing Emails
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive promotional emails and offers
                            </p>
                          </div>
                          <Switch
                            id="marketingEmails"
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "marketingEmails",
                                checked,
                              )
                            }
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Preferences"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="profileVisibility"
                              className="text-base"
                            >
                              Profile Visibility
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Make your profile visible to other users
                            </p>
                          </div>
                          <Switch id="profileVisibility" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dataSharing" className="text-base">
                              Data Sharing
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Allow us to share your data with partners
                            </p>
                          </div>
                          <Switch id="dataSharing" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="activityTracking"
                              className="text-base"
                            >
                              Activity Tracking
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Allow us to track your activity for better
                              recommendations
                            </p>
                          </div>
                          <Switch id="activityTracking" defaultChecked />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="outline"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() =>
                            showNotification(
                              "Data export request submitted. You'll receive your data within 48 hours.",
                              "success",
                            )
                          }
                        >
                          Request Data Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SettingsPage;
