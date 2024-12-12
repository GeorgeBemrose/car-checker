import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MotHistoryListProps {
  motTests: Array<{
    completedDate: string
    testResult: string
    expiryDate: string
    odometerValue: string
    odometerUnit: string
    motTestNumber: string
    defects?: Array<{
      text: string
      type: string
      dangerous: boolean
    }>
  }>
}

export function MotHistoryList({ motTests }: MotHistoryListProps) {
  const sortedTests = [...motTests].sort((a, b) => 
    new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedTests.map((test, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              <span>MOT Test - {new Date(test.completedDate).toLocaleDateString()}</span>
              <Badge variant={test.testResult === "PASSED" ? "success" : "destructive"}>
                {test.testResult}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid sm:grid-cols-3 gap-2 text-sm">
              
              <div>
                <dt className="font-medium">Mileage</dt>
                <dd>{`${test.odometerValue} ${test.odometerUnit}`}</dd>
              </div>
              <div>
                <dt className="font-medium">MOT Test Number</dt>
                <dd>{test.motTestNumber}</dd>
              </div>
              {test.testResult === "PASSED" ? <div>
                <dt className="font-medium">Expiry Date</dt>
                <dd>{new Date(test.expiryDate).toLocaleDateString()}</dd>
              </div> : ""}
            </dl>
            {test.defects && test.defects.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Defects:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {test.defects.map((defect, defectIndex) => (
                    <li key={defectIndex} className="text-sm">
                      <span className={defect.dangerous ? 'text-red-600 font-medium' : ''}>{defect.text}</span>
                      <Badge variant="outline" className="ml-2">{defect.type}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

