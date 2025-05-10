import { Spinner } from "@/components/ui/spinner";

const PaymentProcessingLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <section className="h-4/5 text-center min-h-28 mt-8">
            <Spinner className="mx-auto" />
            <p className="mt-8">
                We are processing your payment. You will be redirected shortly.
            </p>
            {children}
        </section>
    );
};

export default PaymentProcessingLayout;
