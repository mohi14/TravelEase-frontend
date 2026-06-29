import { AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <Lock className="h-6 w-6" />
          </div>

          <CardTitle className="text-2xl flex items-center gap-2">
            403 - Unauthorized
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <p>You don’t have permission to access this page.</p>
          </div>

          <p className="text-sm text-muted-foreground">
            If you believe this is a mistake, please contact your administrator
            or request access.
          </p>

          <div className="flex gap-2 justify-center pt-2">
            <Button
              variant="default"
              render={<Link to={"/"}>Go Home</Link>}
            ></Button>

            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
