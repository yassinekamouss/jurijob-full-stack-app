<?php

use Carbon\Carbon;

$periods = [
    ['start' => Carbon::parse('2023-01'), 'end' => Carbon::parse('2023-12')->endOfMonth()],
    ['start' => Carbon::parse('2023-06'), 'end' => Carbon::parse('2024-05')->endOfMonth()],
];

usort($periods, fn ($a, $b) => $a['start']->eq($b['start']) ? 0 : ($a['start']->lessThan($b['start']) ? -1 : 1));

$merged = [];
$current = $periods[0];

for ($i = 1; $i < count($periods); $i++) {
    if ($periods[$i]['start']->lessThanOrEqualTo($current['end'])) {
        if ($periods[$i]['end']->greaterThan($current['end'])) {
            $current['end'] = $periods[$i]['end'];
        }
    } else {
        $merged[] = $current;
        $current = $periods[$i];
    }
}
$merged[] = $current;

$totalMonths = 0;
foreach ($merged as $period) {
    $totalMonths += $period['start']->diffInMonths($period['end']) + 1;
}

echo 'Total months: '.$totalMonths."\n";
