import { gavatar } from "@/components/modules/products/addProduct/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils/formatDate";
import { getCurrentUserInfo } from "@/services/Auth";

const ProfilePage = async () => {
    const res = await getCurrentUserInfo();
    const user = res.data;

    const formattedCreatedAt = formatDate(user.createdAt);
    const formattedUpdatedAt = formatDate(user?.updatedAt);

    return (
        <Card className="mx-auto my-10 max-w-md ">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage
                        src={user.profileImage || gavatar}
                        alt={user.name}
                    />
                </Avatar>
                <div>
                    <CardTitle className="font-ubuntu font-semibold mb-2 text-2xl">
                        {user.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 *:text-sm">
                        <Badge
                            variant={
                                user.role === "admin" ? "default" : "secondary"
                            }>
                            <span className="first-letter:uppercase">
                                {user.role}
                            </span>
                        </Badge>
                        <Badge
                            variant={
                                user.isBlocked ? "destructive" : "outline"
                            }>
                            {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium border-b-2 pb-1 border-gray-800">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium  border-b-2 pb-1 border-gray-800">{user.phoneNumber}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Joined At</p>
                        <p className="font-medium  border-b-2 pb-1 border-gray-800">{formattedCreatedAt}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Last Updated
                        </p>
                        <p className="font-medium  border-b-2 pb-1 border-gray-800">{formattedUpdatedAt}</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProfilePage;
