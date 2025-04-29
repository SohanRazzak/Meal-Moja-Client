import SectionHeading from "@/components/shared/sectionheading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/formatDate";
import { getOrderById } from "@/services/Orders";
import { TOrder } from "@/types";

const OrderByIdPage = async ({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) => {
    const { orderId } = await params;
    console.log(
        "%cFolder: [orderId], File: page, Line: 5",
        "color: #943205; font-weight: bold;",
        "\n",
        orderId
    );

    const res = await getOrderById(orderId);
    const order: TOrder = res.data;

    return (
        <div className="my-12">
            <SectionHeading title="Order Details" subtitle={`Order ID: ${order._id}`} size="4xl" className="!mb-0" />
            <div className="grid grid-cols-2 gap-5 my-10 px-3">
                {/* Order summary card  */}
                <Card>
                    <CardHeader>
                        <SectionHeading
                            title="Order Summary"
                            className="!mb-0"
                        />
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 font-noto-mono *:pb-2 *:pt-1 *:border-b-2">
                        <p className="text-gray-700 font-semibold">
                            Order Date:
                        </p>
                        <p className="text-gray-700 text-end font-ubuntu">
                            {formatDate(order.createdAt)}
                        </p>
                        <p className="text-gray-700 font-semibold">
                            Delivary Status:
                        </p>
                        <p className="text-gray-700 text-end font-ubuntu">
                            {order.status}
                        </p>
                        <p className="text-gray-700 font-semibold">
                            Transaction Status:
                        </p>
                        <p className="text-gray-700 text-end font-ubuntu">
                            {order.transaction.transactionStatus}
                        </p>
                        <p className="text-gray-700 font-semibold !border-0">
                            Total Ammount:
                        </p>
                        <p className="text-gray-700 text-end font-ubuntu font-semibold text-2xl !border-0">
                            ${order.totalPrice}/-
                        </p>
                    </CardContent>
                </Card>
                {/* Customer Info card  */}
                <Card>
                    <CardHeader>
                        <SectionHeading
                            title="Customer Info"
                            className="!mb-0"
                        />
                    </CardHeader>
                </Card>
                {/* Order list card  */}
                <Card className="col-span-full"></Card>
                {/* Order transiction card  */}
                <Card className="col-span-full"></Card>
            </div>
        </div>
    );
};

export default OrderByIdPage;
